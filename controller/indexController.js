import { login } from "../model/indexModel.js"

export class LoginController{
    constructor(viewElements){
        this.form=viewElements.form
        this.btnCadastro=viewElements.btnCadastro

        this.init()
    }

    init(){
        if (this.btnCadastro) {
            this.btnCadastro.addEventListener('click', () =>{
                window.api.abrirCadastro()
            })
        }

        this.form.addEventListener('submit', (e) => this.handleSubmit(e))
    }
    
    async handleSubmit(e){
        e.preventDefault()

        const username=document.getElementById('nome-de-usuario').value.trim()
        const senha = document.getElementById('senha').value.trim()

        if (!username) return alert ("Nome de usuário não pode ser vazio.")
        if (!senha) return alert ("Senha não pode ser vazia.")

        try{
            const dados = await login(username, senha)
            console.log("Login realizado com sucesso", dados)
            localStorage.setItem("id_usuario", dados.id)
            window.api.sendLoginSuccess()
        } catch (error){
            alert(error.message)
        }
    }
}