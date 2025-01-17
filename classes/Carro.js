import Veiculo from './Veiculo.js'

class Carro extends Veiculo {
    constructor({ano_fabricacao, cor, imagem,marca,modelo, num_portas, quilometragem, tipo, _id}) {
        super(marca, modelo, ano_fabricacao, quilometragem, imagem)
        this.cor = cor
        this.numPortas = num_portas
        this.tipo = tipo
        this.id = _id
    }
}

export default Carro
