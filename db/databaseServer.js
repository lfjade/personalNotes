import express from 'express'
import cors from 'cors'
import knex from 'knex'
import knexconfig from './knexfile.js'

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

app.listen(3000, () =>{
    console.log('servidor rodando na porta 3000 (!)')
})