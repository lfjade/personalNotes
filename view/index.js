window.addEventListener('DOMContentLoaded', async () =>{
    const form = document.getElementById('login')
    form.addEventListener('submit', async (e)=>{
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
            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: nomeUsuarioValor,
                        senha: senhaValor
                    })
                })

                if (!response.ok){
                    const errorData= await response.json()
                    alert (errorData.error || 'Erro ao tentar login.')
                    return
                }

                const dados = await response.json()
                console.log("Login realizado com sucesso ", dados)
                localStorage.setItem('id_usuario', dados.id)
                window.api.sendLoginSuccess()

            } catch (error){
                console.error("Erro na requisição:", error)
                alert("Erro na conexão com o servidor.")
            }
        }
    })
})