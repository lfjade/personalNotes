import { handleCadastro } from "../controller/cadastroController.js"

window.addEventListener('DOMContentLoaded', () =>{
    const form = document.getElementById('login')

    form.addEventListener('submit', async (e)=>{
        e.preventDefault()

        const nomeUsuario=document.getElementById('nome-de-usuario').value.trim()
        const senha=document.getElementById('senha').value.trim()

        await handleCadastro(nomeUsuario, senha)
    })
})