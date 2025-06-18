window.addEventListener('DOMContentLoaded', async () =>{

    const listaNotas = document.getElementById('lista-notas')
    const formNotas = document.getElementById('form-notas')
    const inputTitulo = document.getElementById('titulo')
    const inputTexto = document.getElementById('texto-nota')
    let modoEdicao = false
    let idNotaAtual = null
    const atualizarBtn = document.getElementById('atualizar')
    const cancelarBtn = document.getElementById('cancelar')
    const excluirBtn = document.getElementById('excluir')
    const submitBtn = document.getElementById('submit')



    async function carregarNotas() {
        const idUsuario = localStorage.getItem('id_usuario')
        
        if (!idUsuario) {
            alert("Usuário não logado.")
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:3000/notas/${idUsuario}`)
            if (!response.ok) throw new Error("Erro ao buscar notas.")

            const notas = await response.json()
            
            listaNotas.innerHTML=''
            
            notas.forEach(nota => {
                const li = document.createElement('li')
                li.classList.add('nota')
                li.innerHTML=`
                <p>${nota.titulo}</p>
                `
                li.addEventListener('click', () =>{
                    inputTitulo.value=nota.titulo
                    inputTexto.value=nota.conteudo
                    idNotaAtual=nota.id
                    modoEdicao=true

                    submitBtn.style.display='none'
                    excluirBtn.style.display='inline-block'
                    atualizarBtn.style.display='inline-block'
                    cancelarBtn.style.display='inline-block'

                })
                listaNotas.appendChild(li)
            })
        } catch (error){
            console.error("Erro ao buscar notas: ", error)
            alert("Erro ao carregar notas.")
        }
    }

    carregarNotas()

    formNotas.addEventListener('submit', async (e) =>{
        e.preventDefault()

        const titulo=inputTitulo.value.trim()
        const conteudo=inputTexto.value.trim()
        const id_usuario = localStorage.getItem('id_usuario')

        if (!titulo || !conteudo){
            alert("Título ou texto vazios.")
            return
        }

        if(!id_usuario) {
            alert ("Nenhum usuário logado.")
            return
        }

        try {
            const res = await fetch(`http://localhost:3000/notas/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    titulo: titulo,
                    conteudo: conteudo,
                    id_usuario: id_usuario
                })
            })

            if(!res.ok){
                const err = await res.json()
                alert(err.error || 'Erro ao adicionar nota.')
                return
            }
            alert("Nota adicionada!")
            inputTitulo.value=''
            inputTexto.value=''
            carregarNotas()
        } catch (error){
            console.error('Erro ao adicionar nota: ', error)
            alert('Erro ao conectar com o servidor.')
        }   
    })
    
    atualizarBtn.addEventListener('click', async () =>{
        const titulo=inputTitulo.value.trim()
        const conteudo=inputTexto.value.trim()

        if(!titulo || !conteudo){
            alert("Título o conteúdo vazios.")
            return
        }

        try {
            const res = await fetch(`http://localhost:3000/notas/${idNotaAtual}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({titulo, conteudo}) //tem que atualizar horario
            })

            if (!res.ok){
                const err = await res.json()
                alert(err.error || "Erro ao atualizar nota.")
                return
            }
            modoEdicao=false
            idNotaAtual=null
            inputTitulo.value=''
            inputTexto.value=''
            submitBtn.style.display='inline-block'
            atualizarBtn.style.display='none'
            cancelarBtn.style.display='none'
            excluirBtn.style.display='none'

            alert("Nota atualizada!")
            carregarNotas()
        } catch (error){
            console.error("Erro ao atualizar nota: ", error)
            alert("Erro ao contectar com o servidor.")
        }
    })

    cancelarBtn.addEventListener('click', () =>{
        modoEdicao=false
        idNotaAtual=null
        inputTitulo.value=''
        inputTexto.value=''
        submitBtn.style.display='inline-block'
        atualizarBtn.style.display='none'
        cancelarBtn.style.display='none'
        excluirBtn.style.display='none'
    })

    excluirBtn.addEventListener('click', async () =>{
        if(!idNotaAtual){
            alert("Nenhuma nota selecionada para excluir.")
            return
        }

        const confirmacao = confirm("Tem certeza de que deseja excluir esta nota?")
        if(!confirmacao) return

        try {
            const res = await fetch(`http://localhost:3000/notas/${idNotaAtual}`, {
                method: 'DELETE'
            })

            if(!res.ok){
                const err = await res.json()
                alert(err.error || "Erro ao excluir nota.")
            }

            alert ("Nota excluída com sucesso!")

            modoEdicao = false
            idNotaAtual = null
            inputTitulo.value = ''
            inputTexto.value = ''
            submitBtn.style.display = 'inline-block'
            atualizarBtn.style.display = 'none'
            cancelarBtn.style.display = 'none'
            excluirBtn.style.display = 'none'

            carregarNotas()
        } catch (error){
            console.error("Erro ao excluir nota: ", error)
            alert("Erro ao conectar com o servidor.")
        }
    })
})