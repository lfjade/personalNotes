window.addEventListener('DOMContentLoaded', async () =>{
    const form = document.getElementById('login')
    form.addEventListener('submit', (e)=>{
        e.preventDefault()

        const nomeUsuarioValor = document.getElementById('nome-de-usuario').value.trim()
        const senhaValor = document.getElementById('senha').value.trim()

        if (!nomeUsuarioValor) {
            alert ("Nome de usuário não pode ser vazio.")
            return
        }

        if (!senhaValor){
            alert("Senha não pode ser vazia.")
            return
        }

        if (nomeUsuarioValor && senhaValor){
            window.api.sendLoginSuccess()
        }
    })
})