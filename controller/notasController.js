import * as Model from '../model/notasModel.js'

let modoEdicao = false
let idNotaAtual = null

export function iniciarController(view){
    const idUsuario = localStorage.getItem('id_usuario')
    if(!idUsuario) return alert("Usuário não logado.")
}

async function carregarNotas() {
    try {
        const notas = await Model.buscarNotas(idUsuario)
        view.exibirNotas(notas)
    } catch (error){
        console.error("Erro ao buscar notas: ", error)
        alert("Erro ao carregar notas.")
    }
}

async function adicionarNota(titulo, conteudo){
    if (!titulo || !conteudo ) return alert("Título ou texto vazios")

    try {
        const response = await Model.adicionarNota(titulo, conteudo, idUsuario)
        if (!response.ok){
            const error = await response.json()
            alert(error.error || 'Erro ao adicionar nota.')
            return
        }

        alert("Nota adicionada!")
        carregarNotas()
        view.limparFormulario()
    } catch (error){
        console.error("Erro ao adicionar nota: ", error)
        alert("Erro ao conectar com o servidor.")
    }
}

async function atualizarNota(titulo, conteudo) {
    if (!titulo || !conteudo) return alert ("Título ou conteúdo vazios.")

    try {
        const response = await Model.atualizarNota(idNotaAtual, titulo, conteudo)
        if(!response.ok){
            const erro = await response.json()
            alert (erro.error || "Erro ao atualizar nota")
            return
        }
        modoEdicao=false
        idNotaAtual=null
        alert("Nota atualizada!")
        carregarNotas()
        view.resetarModoEdicao()
    } catch (error){
        console.error("Erro ao atualizar nota: ", error)
        alert("Erro ao conectar com o servidor.")
    }
}

async function excluirNota() {
    if (!idNotaAtual) return alert ("Nenhuma nota selecionada para excluir.")
    if (!confirm("Tem certeza que deseja excluir esta nota?")) return

    try {
        const response = await Model.excluirNota(idNotaAtual)
        if (!response.ok){
            const error = await response.json()
            alert(error.error || "Erro ao excluir nota.")
            return
        }

        alert("Nota excluída com sucesso.")
        modoEdicao=false
        idNotaAtual=null
        carregarNotas()
        view.resetarModoEdicao()
    } catch (error){
        console.error("Erro ao excluir nota: ", error)
        alert("Erro ao conectar com o servidor.")
    }

}

function selecionarNota(nota){
    modoEdicao=true
    idNotaAtual=nota.id
    view.preencherFormulario(nota)
    view.mostrarBotoesEdicao()
}

// começa já carregando as notas
carregarNotas()

return {
    adicionarNota,
    atualizarNota,
    excluirNota,
    selecionarNota,
    cancelarEdicao,
}