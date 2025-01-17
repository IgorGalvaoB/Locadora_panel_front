import Locadora from "../classes/Locadora.js"


let locadora = null

export const getLocadora = async () => {
    if (!locadora) {
        locadora = new Locadora()
        await locadora.inicializar()
    }
    return locadora
}