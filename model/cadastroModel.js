export async function buscarUsuarios(){
    const response = await fetch('http://localhost:3000/usuarios')
    return await response.json()
}

export async function cadastrarUsuario(username, senha){
    const response = await fetch ('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, senha})
    })

    return response
}