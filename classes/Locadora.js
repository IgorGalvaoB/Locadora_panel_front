import Carro from './Carro.js'
import { adicionarCarroAPI, listarCarrosAPI, excluirCarroAPI } from '../api/apiHandler.js'

class Locadora {
    constructor() {
        this.carros = []
        this.inicializar() 
    }

    inicializar = async () => {
        try {
            const carrosData = await listarCarrosAPI()
            if (Array.isArray(carrosData) && carrosData.length > 0) {
               
                this.carros = carrosData.map(carro => new Carro({ 
                    ...carro, 
                    id: carro._id
                }))
            } else {
                console.log('Não há carros para carregar')
            }
        } catch (error) {
            console.error('Erro ao inicializar a locadora:', error)
            alert('Não foi possível carregar dados da locadora')
        }
    }

    adicionarCarro = async (carro, imagem) => {
        try {
            const mensagem = await adicionarCarroAPI(carro, imagem)
            if (mensagem.includes('sucesso')) {
                this.carros.push(new Carro({ 
                    ...carro, 
                    id: carro._id
                }))
            }
            return mensagem
        } catch (error) {
            console.error('Erro ao adicionar carro:', error)
            return 'Erro ao adicionar carro.'
        }
    }

    listarCarros = () => {
        if (this.carros.length > 0) {
            return this.carros
        }
        return 'Não há carros para listar.'
    }

    excluirCarro = async (id) => {
        try {
            const mensagem = await excluirCarroAPI(id)
            if (mensagem.includes('sucesso')) {
                this.carros = this.carros.filter(carro => carro.id !== id)
            }
            return mensagem
        } catch (error) {
            console.error('Erro ao excluir carro:', error)
            return 'Erro ao excluir carro.'
        }
    }
}

export default Locadora
