import ApiHandler from './api/ApiHandler.js'

class Carro {
    constructor({ ano_fabricacao, cor, imagem, marca, modelo, num_portas, quilometragem, tipo, _id }) {
        this.cor = cor
        this.numPortas = num_portas
        this.tipo = tipo
        this.id = _id
        this.marca = marca
        this.modelo = modelo
        this.anoFabricacao = ano_fabricacao
        this.quilometragem = quilometragem
        this.imagem = imagem
    }

    deleteCarro = async () => {
        if (!this.id) {
            alert("Erro: ID do carro não encontrado. Não é possível excluir.")
            throw new Error("ID do carro não encontrado. Não é possível excluir.")
        }

        try {
            const apiHandler = new ApiHandler()
            const response = await apiHandler.excluirCarro(this.id)

            if (response.includes('excluído com sucesso')) {
                console.log(`Carro ${this.modelo} (${this.id}) excluído com sucesso.`)
                return response
            } else {
                throw new Error(response)
            }
        } catch (error) {
            alert(`Erro ao excluir o carro: ${error.message}`)
            console.error(`Erro ao excluir o carro: ${error.message}`)
            return `Erro ao excluir o carro: ${error.message}`
        }
    }

    getCarro = () => ({
        cor: this.cor,
        numPortas: this.numPortas,
        tipo: this.tipo,
        id: this.id,
        marca: this.marca,
        modelo: this.modelo,
        anoFabricacao: this.anoFabricacao,
        quilometragem: this.quilometragem,
        imagem: this.imagem,
    })
}

export default Carro
