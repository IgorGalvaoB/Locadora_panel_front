import Locadora from "../classes/Locadora.js"

const getLocadora = async () => {
    if (!window.locadora) {
        try {
            window.locadora = new Locadora()
            await window.locadora.inicializar()
        } catch (error) {
            console.error("Erro ao inicializar a locadora:", error)
            alert("Erro ao inicializar a locadora. Tente novamente.")
        }
    }
    return window.locadora
}

export default getLocadora
