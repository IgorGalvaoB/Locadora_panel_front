const BASE_URL = 'https://back-end-locadora-web-1-final-eb099bfda2da.herokuapp.com'
const LOGIN_URL = `${BASE_URL}/auth/login`
const LIST_CARS_URL = `${BASE_URL}/listCars/getCars`
const DEL_CAR_URL = `${BASE_URL}/adminCars/deleteCar/`
const ADD_CAR_URL = `${BASE_URL}/adminCars/addCar`

export const adicionarCarroAPI = async (formData) => {
    const token = sessionStorage.getItem('token')
    if (!token) {
        console.error('Token de autorização não encontrado.')
        return 'Token de autorização não encontrado.'
    }

    for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value)
}

    

    try {
        const response = await fetch(`${ADD_CAR_URL}`, {
            method: 'POST',
            headers: {
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODZkZTNjNGUxN2U1OWNjMjJhZjA3YyIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MzcwMDM2Mzd9.HtlD0lPGkEUIBIHPsfXo8KaeQsYv4CVPHsP_lZyE34s', 
            },
            body: formData, 
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Falha ao adicionar o carro.')
        }

        console.log('Carro adicionado com sucesso:', data.carro)
        return `Carro ${data.carro.modelo} adicionado com sucesso.`

    } catch (error) {
        console.error('Erro ao adicionar o carro:', error.message)
        return `Erro ao adicionar o carro: ${error.message}`
    }
}


export const listarCarrosAPI = async () => {
    try {
        const response = await fetch(LIST_CARS_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.error || 'Erro ao buscar os carros')
        }

        if (data.length === 0) {
            console.warn('Não há carros disponíveis para listar.')
            return 'Não há carros para listar'
        }

        return data

    } catch (error) {
        console.error('Erro ao listar carros:', error.message)
        return 'Erro ao tentar listar os carros. Verifique a conexão com o banco de dados.'
    }
}


export const excluirCarroAPI = async (id) => {
    const token = sessionStorage.getItem('token')
    if (!token) {
        console.error('Token de autorização não encontrado.')
        return 'Token de autorização não encontrado.'
    }


    const bearerToken = `Bearer ${token}`

    try {
        const response = await fetch(`${DEL_CAR_URL}${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': bearerToken,
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



export const loginAPI = async (username, password) => {
    try {
        const response = await fetch(LOGIN_URL, {
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
