import ApiHandler from '../classes/api/ApiHandler.js'
import CardCarro from '../classes/CardCarro.js'

const useCarCards = async () => {
    const apiHandler = new ApiHandler()

    try {
      
        
        
        const carros = await apiHandler.listarCarros()

        if (carros === 'Não há carros para listar') {
            return 'Nenhum carro cadastrado'
        }else{
            const carCards = carros.map((carroData) => {
                const cardCarro = new CardCarro(carroData)
                return cardCarro.getCardCarro()
            })
            return carCards

        }

        
    } catch (error) {
        console.error('Erro ao carregar os carros:', error.message)
        return `Erro ao carregar os carros: ${error.message}`
    }
}

export default useCarCards