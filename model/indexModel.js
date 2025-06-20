export async function login(username, senha){
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({username, senha})
    })

    if (!response.ok){
        const errorData = await response.json()
        throw new Error(errorData.error || "Erro ao tentar login.")
    }
    
    return await response.json()
}