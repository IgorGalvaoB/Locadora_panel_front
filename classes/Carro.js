class Carro {
    constructor({ano_fabricacao, cor, imagem,marca,modelo, num_portas, quilometragem, tipo, _id}) {
        this.cor = cor
        this.numPortas = num_portas
        this.tipo = tipo
        this.id = _id
        this.marca = marca;
        this.modelo = modelo;
        this.anoFabricacao = ano_fabricacao;
        this.quilometragem = quilometragem;
        this.imagem = imagem;
    }
    
}

export default Carro
