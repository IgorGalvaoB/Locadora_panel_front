import getLocadora from "./locadoraGlobal.js"
import { adicionarCarroAPI } from "../api/apiHandler.js"

document.addEventListener("DOMContentLoaded", async () => {
    // Atualizar o nome do arquivo selecionado
    const fileInput = document.getElementById("imagem")
    const fileName = document.getElementById("file-name")

    fileInput.addEventListener("change", (event) => {
        const selectedFile = event.target.files[0]
        if (selectedFile) {
            fileName.textContent = selectedFile.name
        } else {
            fileName.textContent = "Nenhum arquivo selecionado" 
        }
    })

    const addCarForm = document.getElementById("addCarForm")

    addCarForm.addEventListener("submit", async (event) => {
        event.preventDefault()
        event.stopPropagation()

        if (!addCarForm.checkValidity()) {
            addCarForm.classList.add("was-validated")
            return
        }

       
        const formData = new FormData()
        formData.append("marca", document.getElementById("marca").value.trim())
        formData.append("cor", document.getElementById("cor").value.trim())
        formData.append("ano_fabricacao", document.getElementById("ano_fabricacao").value.trim())
        formData.append("quilometragem", document.getElementById("quilometragem").value.trim())
        formData.append("modelo", document.getElementById("modelo").value.trim())
        formData.append("num_portas", document.getElementById("num_portas").value.trim())
        formData.append("tipo", document.getElementById("tipo").value.trim())
        formData.append("image", fileInput.files[0])
        console.log("Arquivo selecionado:", document.getElementById("imagem").files[0])
        console.log("Form data:", formData)

        try {
         
            const response = await adicionarCarroAPI(formData)

            if (response.carro) {
                const locadora = await getLocadora()
                locadora.carros.push({
                    ...response.carro,
                    id: response.carro._id
                })

                alert("Carro adicionado com sucesso!")
            } else {
                alert(response.message || "Erro ao adicionar o carro.")
            }

            addCarForm.reset()
            fileName.textContent = "Nenhum arquivo selecionado"
            addCarForm.classList.remove("was-validated")
        } catch (error) {
            console.error("Erro ao adicionar carro:", error)
            alert("Erro ao adicionar o carro. Tente novamente.")
        }
    })
})
