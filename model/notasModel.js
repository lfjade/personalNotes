const URL_BASE = 'http://localhost:3000/notas'

export async function buscarNotas(idUsuario){
    const response = await fetch(`${URL_BASE}/${idUsuario}`)
    if(!response.ok) throw new Error("Erro ao buscar notas.")
    return await response.json()
}

export async function adicionarNota(titulo, conteudo, idUsuario){
    const response = await fetch(URL_BASE, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({titulo, conteudo, id_usuario: idUsuario})
    })
    return response
}

export async function atualizarNota(idNota, titulo, conteudo){
    const response = await fetch(`${URL_BASE}/${idNota}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({titulo, conteudo})
    })
    return response
}

export async function excluirNota(idNota) {
    const response = await fetch(`${URL_BASE}/${idNota}`, {
        method: 'DELETE'
    })
    return response
}