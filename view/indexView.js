import { LoginController } from "../controller/indexController.js"

window.addEventListener("DOMContentLoaded", () =>{
    const form = document.getElementById("login")
    const btnCadastro = document.getElementById("cadastro")

    new LoginController({form, btnCadastro})
})