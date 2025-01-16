document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.getElementById("login-button")

    const checkToken = () => {
        const token = sessionStorage.getItem("token")
        if (token) {
            
            loginButton.textContent = "Logout"
            loginButton.classList.remove("btn-light")
            loginButton.classList.add("btn-danger")
            loginButton.addEventListener("click", handleLogout)
        } else {
            
            loginButton.textContent = "Login"
            loginButton.classList.remove("btn-danger")
            loginButton.classList.add("btn-light")
            loginButton.removeEventListener("click", handleLogout)
        }
    }

   
    const handleLogout = (event) => {
        event.preventDefault()
        sessionStorage.removeItem("token")
        sessionStorage.removeItem("usuario")
        sessionStorage.removeItem("ID")
        window.location.href = "./home.html"
    }

    window.addEventListener("storage", () => {
        checkToken()
    })

    checkToken()

})
