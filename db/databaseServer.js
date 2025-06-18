const express = require('express')
const cors = require('cors')
const knex = require('knex')
const knexconfig = require('./knexfile.js')

const app = express()
app.use(cors())
app.use(express.json())

const db = knex(knexconfig)

app.get('/', (req, res) =>{
    res.send('servidor ok')
})

app.get('/usuarios', async (req, res) =>{
    try{
        const usuarios = await db('usuarios').select('*')
        res.json(usuarios)
    } catch (error){
        res.status(500).json({error: error.message})
    }
})

app.post('/usuarios', async (req, res) =>{
    try{
        const {username, senha}= req.body
        const [id]=await db('usuarios').insert({username, senha})
        res.status(201).json({id, username, senha})
    } catch (error){
        res.status(500).json({error: error.message})
    }
})

app.post('/login', async (req, res) =>{
    const {username, senha} = req.body
    try {
        const usuario = await db('usuarios').where({username}).first()

        if (!usuario) {
            return res.status(404).json({error: "Usuário não encontrado."})
        }

        if (usuario.senha!==senha){
            return res.status(401).json({error: "Senha incorreta."})
        }

        return res.status(200).json({message: "Login bem sucedido!", id:usuario.id})
    } catch (error){
        console.error("Erro ao tentar login: ", error)
        return res.status(500).json({error: "Erro interno ao tentar login."})
    }
})

//rotas get, update, post, delete de notas

//notas get
app.get('/notas/:id_usuario', async (req, res) =>{
    const {id_usuario} = req.params;

    try {
        const notas = await db('notas').where({id_usuario}).select('*').orderBy('dataEdicao', 'desc')
        res.status(200).json(notas)
    } catch (error) {
        console.error("Erro ao buscar notas: ", error)
        res.status(500).json({error: 'Erro ao buscar notas.'})
    }
    
})

// notas post
app.post('/notas', async (req, res) =>{
    const {titulo, conteudo, id_usuario} = req.body

    if (!titulo || !conteudo || !id_usuario){
        return res.status(400).json({error: "Título, conteúdo e id_usuário são obrigatórios."})
    }

    try {
        const dataEdicao = new Date().toISOString().slice(0,19).replace('T', ' ')
        const [novoID] = await db('notas').insert({
            titulo,
            conteudo,
            dataEdicao,
            id_usuario
        })

        const novaNota = await db('notas').where({id: novoID}).first()

        res.status(201).json(novaNota)
    } catch (error){
        console.error("Erro ao criar nova nota: ", error)
        res.status(500).json({error: 'Erro ao criar nova nota.'})
    }
})

// rota put notas

app.put('/notas/:id', async (req, res) =>{
    const {id} = req.params
    const {titulo, conteudo} = req.body

    if (!titulo || !conteudo){
        return res.status(400).json({error: "Título e conteúdo são obrigatórios."})
    }

    try {
        const atualizados = await db('notas').where({id}).update({
            titulo,
            conteudo,
            dataEdicao: new Date()
        })

        if (atualizados ===0){
            return res.status(404).json({error: "Nota não encontrada."})
        }
        
        res.status(200).json({mensagem: "Nota atualizada com sucesso."})
    } catch (error){
        console.error("Erro ao atualizar a nota: ", error)
        res.status(500).json({error: "Erro ao atualizar a nota."})
    }
})

// rota delete

app.delete('/notas/:id', async (req, res) =>{
    const {id}=req.params

    try {
        const notaRemovida = await db('notas').where({id}).del()

        if (notaRemovida===0){
            return res.status(404).json({error: 'Nota não encontrada.'})
        }

        res.status(200).json({message: 'Nota removida com sucesso.'})
    } catch (error){
        console.error('Erro ao deletar nota: ', error)
        res.status(500).json({error: 'Erro ao deletar nota.'})
    }
})

app.listen(3000, () =>{
    console.log('servidor rodando na porta 3000 (!)')
})
