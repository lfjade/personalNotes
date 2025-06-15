import express from 'express'
import cors from 'cors'
import knexdb from './knexfile.js'

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) =>{
    res.send('Servidor rodando!')
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000.")
})