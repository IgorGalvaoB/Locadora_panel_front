import Veiculo from './Veiculo.js'

class Carro extends Veiculo {
    constructor(marca, modelo, anoFabricacao, quilometragem, imagem, cor, numPortas, tipo, id) {
        super(marca, modelo, anoFabricacao, quilometragem, imagem)
        this.cor = cor
        this.numPortas = numPortas
        this.tipo = tipo
        this.id = id
    }
}

export default Carro
