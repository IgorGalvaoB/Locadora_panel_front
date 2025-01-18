import ApiHandler from "../classes/api/ApiHandler.js"


document.addEventListener("DOMContentLoaded", async () => {

    const loginForm = document.getElementById("loginForm")

    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault()
        event.stopPropagation()

        const username = document.getElementById("username").value.trim()
        const password = document.getElementById("password").value.trim()

        if (!loginForm.checkValidity()) {
            loginForm.classList.add("was-validated")
            return
        }
        const apiHandler = new ApiHandler()
        try {
            const response = await apiHandler.login(username, password)

            if (response.token) {
                window.location.href = "./home.html"
            } else {
                alert(response.error || "Erro desconhecido ao realizar login")
            }
        } catch (error) {
            console.error("Erro no login:", error)
            alert("Erro ao conectar ao servidor Tente novamente mais tarde")
        }
    })
})
