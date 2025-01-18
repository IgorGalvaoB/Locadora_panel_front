import ApiHandler from "../classes/api/ApiHandler.js"

document.addEventListener("DOMContentLoaded", async () => {
    const token = sessionStorage.getItem("token")
    if (!token) {
        window.location.href = "./login.html"
        alert("Você precisa estar logado para acessar esta página.")    
        return
    }
   
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
    const apiHandler = new ApiHandler()
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

        try {
         
            await apiHandler.adicionarCarro(formData)
           
            addCarForm.reset()
            fileName.textContent = "Nenhum arquivo selecionado"
            addCarForm.classList.remove("was-validated")

        } catch (error) {
            console.error("Erro ao adicionar carro:", error)

        }
    })
})
