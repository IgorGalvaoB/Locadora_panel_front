class Veiculo {
    constructor(marca, modelo, anoFabricacao, quilometragem, imagem) {
        if (new.target === Veiculo) {
            throw new TypeError("Não é possível instanciar a classe. Utilize uma classe filha.");
        }
        this.marca = marca;
        this.modelo = modelo;
        this.anoFabricacao = anoFabricacao;
        this.quilometragem = quilometragem;
        this.imagem = imagem;
    }
}

export default Veiculo;
