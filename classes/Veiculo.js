class Veiculo {
    constructor(marca, modelo, ano_fabricacao, quilometragem, imagem) {
        if (new.target === Veiculo) {
            throw new TypeError("Não é possível instanciar a classe. Utilize uma classe filha.");
        }
        this.marca = marca;
        this.modelo = modelo;
        this.anoFabricacao = ano_fabricacao;
        this.quilometragem = quilometragem;
        this.imagem = imagem;
    }
}

export default Veiculo;
