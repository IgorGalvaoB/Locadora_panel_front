import Carro from './Carro.js'

class CardCarro extends Carro {
    constructor(props) {
        super(props)
    }

    getCardCarro = () => {
        const card = document.createElement('div')
        card.className = 'card card-carro p-2 d-flex flex-column'

        const img = document.createElement('img')
        img.src = this.imagem
        img.className = 'card-img-top rounded-2'
        img.alt = `Imagem do carro ${this.modelo}`

        const cardBody = document.createElement('div')
        cardBody.className = 'card-body mb-1'

        const title = document.createElement('h5')
        title.className = 'card-title'
        title.innerText = `${this.modelo.toUpperCase()}`
        
        const cardBodyContent = document.createElement('div')
 

        const details = document.createElement('p')
        details.className = 'card-text'
        details.innerHTML = `
            <strong>Marca:</strong> ${this.marca}<br>
            <strong>Ano de Fabricação:</strong> ${this.anoFabricacao}<br>
            <strong>Cor:</strong> ${this.cor}<br>
            <strong>Número de Portas:</strong> ${this.numPortas}<br>
            <strong>Quilometragem:</strong> ${this.quilometragem} km<br>
            <strong>Tipo:</strong> ${this.tipo}<br>
        `

        cardBody.appendChild(title)
        cardBodyContent.appendChild(details)
        cardBody.appendChild(cardBodyContent)
        card.appendChild(img)
        card.appendChild(cardBody)

        return card
    }
}

export default CardCarro
