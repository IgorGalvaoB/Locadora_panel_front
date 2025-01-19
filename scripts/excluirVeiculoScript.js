import useCarCards from "../hooks/useCarroCards.js"

document.addEventListener("DOMContentLoaded", async () => {
    const token = sessionStorage.getItem("token")
    if (!token) {
        window.location.href = "./login.html"
        alert("Você precisa estar logado para acessar esta página.")    
        return
    }
    const cardContainer = document.getElementById("cardContainer")
    
    const content = document.getElementById("content")
    try {


        const loadingElement = document.createElement("img")
        loadingElement.src = "../assets/gif/loading.svg"
        loadingElement.alt = "Carregando..."
        loadingElement.className = "loading"
        content.appendChild(loadingElement)


        const carCards = await useCarCards("delete")
     

        content.removeChild(loadingElement)


        
        if (carCards === "Nenhum carro cadastrado") {
            const noCarsMessage = document.createElement("h5")
            noCarsMessage.className = "text-center text-danger"
            noCarsMessage.textContent = "Nenhum carro cadastrado."
            cardContainer.appendChild(noCarsMessage)
            
        } else {
            carCards.forEach((card) => {
                cardContainer.appendChild(card)
            })
        }
    } catch (error) {
        console.error("Erro ao carregar os carros:", error)
        cardContainer.textContent = "Erro ao carregar os carros. Tente novamente mais tarde."
    }
})
