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

app.listen(3000, () =>{
    console.log('servidor rodando na porta 3000 (!)')
})
