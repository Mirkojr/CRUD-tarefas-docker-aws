docker run --name meu-banco-postgres -e POSTGRES_PASSWORD=minhasenha -d -p 5432:5432 postgres

docker exec meus-banco-postgres psql -U postgres

// depois desse comando vc ta dentro do executor sql

container: tarefa-db
banco: tarefas_db
porta: 5432:5432
senha: marcos10

alguns comandos úteis dentro do psql:
\c "outro-container" // troca de cntainer
\dt 		     // lista tabelas
