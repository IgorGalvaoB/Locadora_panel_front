import Locadora from "../classes/Locadora.js"

const getLocadora = async () => {
    if (!window.locadora) {
        console.log("aqui")
        try {
            var locadora = new Locadora()
            await locadora.inicializar()
        } catch (error) {
            console.error("Erro ao inicializar a locadora:", error)
            alert("Erro ao inicializar a locadora. Tente novamente.")
        }
    }
    
    return locadora
}

export default getLocadora
