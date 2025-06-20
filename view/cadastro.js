window.addEventListener('DOMContentLoaded', async () =>{
    const form = document.getElementById('login')

    form.addEventListener('submit', async (e) =>{
        e.preventDefault()

        const nomeUsuarioValor=document.getElementById('nome-de-usuario').value.trim()
        const senhaValor=document.getElementById('senha').value.trim()

        if (!nomeUsuarioValor) {
            alert ("Nome de usuário não pode ser vazio.")
            return
        }

        if (!senhaValor){
            alert("Senha não pode ser vazia.")
            return
        }

        try {
            const usuariosResponse=await fetch('http://localhost:3000/usuarios')
            const usuarios = await usuariosResponse.json()
            const usuarioExiste = usuarios.find(u => u.username === nomeUsuarioValor)

            if (usuarioExiste){
                alert ("Nome de usuário já cadastrado.")
                return
            }

            const criarUsuarioResponse = await fetch ('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    username: nomeUsuarioValor,
                    senha: senhaValor
                })
            })

            if (!criarUsuarioResponse.ok){
                const erro = await criarUsuarioResponse.json()

                alert(erro.error || "Erro ao cadastrar usuário.")
            }

            const novoUsuario = await criarUsuarioResponse.json()
            alert ("Usuário cadastrado!")

            window.location.href='index.html'
        } catch (error){
            console.error("Erro ao cadastrar: ", error)
            alert ("Erro no servidor.")
        }

    })
})