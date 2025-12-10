require('dotenv').config();
const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")


const app = express()
app.use(express.json()) // permitir leitura de json do front
app.use(cors()) // permitir que o front acesse o back

// conexão com o banco
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// definindo as rotas 
app.get('/tarefas', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM tarefas ORDER by id ASC');
        res.json(resultado.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
});

app.post('/tarefas', async (req, res) => {
    try{
        const { titulo, descricao } = req.body;

        // o $1 é para o banco não executar o dado inserido, proteção contra injection
        // RETURNING * para saber a linha criada inteira
        const novaTarefa = await pool.query('INSERT INTO tarefas (titulo, descricao) VALUES ($1, $2) RETURNING *', [titulo, descricao]);
        res.json(novaTarefa.rows[0]);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Erro ao salvar tarefa');
    }
});

app.delete('/tarefas/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const result = await pool.query('DELETE FROM tarefas WHERE id = $1', [id]);
        
        if(result.rowCount === 0) {
            return res.status(404).json({ error: "Tarefa não encontrada"});
        }
        res.json(result.rows[0]); 
    } catch (err){
        console.error(err.message);
        res.status(500).send('Erro ao deletar tarefa');
    }
})

app.put('/tarefas/:id', async (req, res) => {
    try{
        const { id } = req.params;
        const { concluida } = req.body;

        const result = await pool.query('UPDATE tarefas SET concluida = $1 WHERE id = $2 RETURNING *', [concluida, id]);
        if (result.rowCount === 0){
            return res.status(404).json({ error: "Tarefa não encontrada"});
        }
        res.json(result.rows[0]);
    } catch (err){
        console.error(err.message);
        res.status(500).send('Erro ao atualizar tarefa');
    }
});

const PORT = process.env.SERVER_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT} 🚀`);
});