class ApiHandler {
    constructor() {
        this.BASE_URL = 'https://back-end-locadora-web-1-final-eb099bfda2da.herokuapp.com'
        this.LOGIN_URL = `${this.BASE_URL}/auth/login`
        this.LIST_CARS_URL = `${this.BASE_URL}/listCars/getCars`
        this.DEL_CAR_URL = `${this.BASE_URL}/adminCars/deleteCar/`
        this.ADD_CAR_URL = `${this.BASE_URL}/adminCars/addCar`
    }

    async adicionarCarro(formData) {
        const token = sessionStorage.getItem('token')
        if (!token) {
            alert('Token de autorização não encontrado.')
            return
        }
        try {
            const response = await fetch(this.ADD_CAR_URL, {
                method: 'POST',
                headers: {
                    Authorization: `${token}`,
                },
                body: formData,
            })

            const data = await response.json()

            if (!response.ok) {

                throw new Error(data.error || 'Falha ao adicionar o carro.')
            }

            console.log('Carro adicionado com sucesso:', data.carro)
            alert(`Carro ${data.carro.modelo} adicionado com sucesso.`)
            return {
                message: `Carro ${data.carro.modelo} adicionado com sucesso.`,
                carro: data.carro
            }

        } catch (error) {
            alert('Erro ao adicionar o carro no banco de dados.')
            console.error('Erro ao adicionar o carro:', error.message)
            return `Erro ao adicionar o carro: ${error.message}`
        }
    }

    async listarCarros() {
        try {
            const response = await fetch(this.LIST_CARS_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()

            if (!data) {
                throw new Error(data.error || 'Erro ao buscar os carros')
            }

            if (data.message === "Nenhum carro encontrado") {
        
                return 'Não há carros para listar'
            }

            return data

        } catch (error) {
            console.error('Erro ao listar carros:', error.message)
            return 'Erro ao tentar listar os carros. Verifique a conexão com o banco de dados.'
        }
    }

    async excluirCarro(id) {
        const token = sessionStorage.getItem('token')
        if (!token) {
            console.error('Token de autorização não encontrado.')
            return 'Token de autorização não encontrado.'
        }

        try {
            const response = await fetch(`${this.DEL_CAR_URL}${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `${token}`,
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Falha ao excluir o carro.')
            }

            const nomeCarro = data.message.split(' ')[1]
            console.log(`${nomeCarro} excluído com sucesso.`)
            return `${nomeCarro} excluído com sucesso.`

        } catch (error) {
            console.error('Erro ao excluir o carro:', error.message)
            return `Erro ao excluir o carro: ${error.message}`
        }
    }

    async login(username, password) {
        try {
            const response = await fetch(this.LOGIN_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Erro desconhecido no login')
            }

            sessionStorage.setItem('token', `Bearer ${data.token}`)
            sessionStorage.setItem('usuario', data.username)
            sessionStorage.setItem('ID', data.userId)

            return data

        } catch (error) {
            console.error('Erro no login:', error.message)
            return {
                place: "Error on login",
                error: error.message
            }
        }
    }
}

export default ApiHandler
