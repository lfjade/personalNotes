import * as Model from '../model/cadastroModel.js'

export async function handleCadastro(nomeUsuario, senha){
    if (!nomeUsuario) return alert("Nome de usuário não pode ser vazio.")
    if (!senha) return alert ("Senha não pode ser vazia.")

    try {
        const usuarios = await Model.buscarUsuarios()
        const usuarioExiste = usuarios.find((u) => u.username === nomeUsuario)

        if (usuarioExiste) return alert("Nome de usuário já cadastrado.")

        const resposta = await Model.cadastrarUsuario(nomeUsuario, senha)

        if (!resposta.ok) {
            const erro = await resposta.json()
            alert(erro.error || "Erro ao cadastrar usuário.")
            return
        }

        alert ("Usuário cadastrado!")

        window.location.href='index.html'
    } catch (error){
        console.error("Erro ao cadastrar: ", error)
        alert ("Erro no servidor.")
    }
}