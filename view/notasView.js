import { iniciarController } from "../controller/notasController.js"

window.addEventListener('DOMContentLoaded', () =>{
    const listaNotas = document.getElementById('lista-notas')
    const formNotas = document.getElementById('form-notas')
    const inputTitulo = document.getElementById('titulo')
    const inputTexto = document.getElementById('texto-nota')
    const atualizarBtn = document.getElementById('atualizar')
    const cancelarBtn = document.getElementById('cancelar')
    const excluirBtn=document.getElementById('excluir')
    const submitBtn=document.getElementById('submit')

    const controller=iniciarController({
        exibirNotas(notas){
            listaNotas.innerHTML=''
            notas.forEach((nota) =>{
                const li = document.createElement('li')
                li.classList.add('nota')
                li.textContent=nota.titulo
                li.addEventListener('click', () => controller.selecionarNota(nota))
                listaNotas.appendChild(li)
            })
        },

        preencherFormulario(nota){
            inputTitulo.value=nota.titulo
            inputTexto.value=nota.conteudo
        },

        limparFormulario(){
            inputTitulo.value=''
            inputTexto.value=''
        },

        mostrarBotoesEdicao(){
            submitBtn.style.display='none'
            excluirBtn.style.display='inline-block'
            atualizarBtn.style.display='inline-block'
            cancelarBtn.style.display='inline-block'
        },

        resetarModoEdicao(){
            this.limparFormulario()
            submitBtn.style.display='inline-block'
            atualizarBtn.style.display='none'
            cancelarBtn.style.display='none'
            excluirBtn.style.display='none'
        }
    })

    formNotas.addEventListener('submit', (e)=>{
        e.preventDefault()
        const titulo=inputTitulo.value.trim()
        const conteudo=inputTexto.value.trim()

        controller.adicionarNota(titulo, conteudo)
    })

    atualizarBtn.addEventListener('click', () => {
        const titulo=inputTitulo.value.trim()
        const conteudo=inputTexto.value.trim()

        controller.atualizarNota(titulo, conteudo)
    })

    cancelarBtn.addEventListener('click', () =>{
        controller.cancelarEdicao()
    })

    excluirBtn.addEventListener('click', () =>{
        controller.excluirNota()
    })
})