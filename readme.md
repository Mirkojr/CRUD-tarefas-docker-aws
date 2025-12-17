# Gerenciador de Tarefas Fullstack

Aplicação web para gerenciamento de tarefas (CRUD), desenvolvida com foco em containerização, orquestração de serviços e deploy em ambiente cloud (AWS).

O objetivo principal do projeto foi estruturar uma arquitetura completa de microserviços, isolando frontend, backend e banco de dados em containers.

## Tecnologias Utilizadas

**Infraestrutura e DevOps**
- Docker & Docker Compose
- Nginx 
- AWS EC2 (Linux Ubuntu)

**Backend**
- Node.js
- PostgreSQL (Imagem Alpine)

**Frontend**
- HTML5 / CSS3
- JavaScript (Vanilla)

## Arquitetura

O projeto roda sobre três containers orquestrados via Docker Compose:

1. **Frontend**: Servidor Nginx rodando em Alpine Linux. Responsável por servir os arquivos estáticos e atuar como ponto de entrada na porta 80/8080.
2. **Backend**: API Node.js. Comunica-se com o banco de dados e expõe os endpoints para o frontend.
3. **Database**: PostgreSQL persistente através de volumes Docker.

## Pré-requisitos

- Docker
- Docker Compose

## Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/Mirkojr/CRUD-tarefas-docker-aws
   cd CRUD-tarefas-docker-aws
   ```

2. Configure as variáveis de ambiente no arquivo `.env`:
   ```env
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_HOST=db
    DB_PORT=5432
    DB_NAME=tarefas_db
    SERVER_PORT=3000
    ```

3. Construa e inicie os containers:
    ```bash
    docker-compose up --build -d
    ```

4. Acesse a aplicação via navegador:
    Frontend: http://localhost:8080 (ou IP da máquina)
    API: http://localhost:3000

## Deploy na AWS

1. Crie uma instância EC2 (Ubuntu) na AWS.

2. Configure o Security Group para permitir tráfego nas portas 22(SSH), 80 (HTTP) e 3000 (API).

3. Acesso ao Servidor:
    ssh -i "sua-chave.pem" ubuntu@SEU_IP_PUBLICO

4. Instale Docker e Docker Compose na instância:
    ```bash
    sudo apt update
    sudo apt install docker.io docker-compose -y
    ```

5. Clone o repositório na instância EC2 e navegue até o diretório:
    ```bash
    git clone https://github.com/Mirkojr/CRUD-tarefas-docker-aws
    cd CRUD-tarefas-docker-aws
    ``` 

6. Configure o arquivo `.env` na instância EC2 conforme descrito anteriormente.

7. Edite o arquivo de script dentro do servidor:
    ```bash 
        nano frontend/public/script.js
    ```
    Altere a linha que define a variável `API_URL` para usar o IP público da instância EC2:
    ```javascript
    const API_URL = 'http://SEU_IP_PUBLICO:3000/tarefas';
    ```
    (Salve com Ctrl+O e saia com Ctrl+X)

8. Construa e inicie os containers na instância:
    ```bash
    sudo docker-compose up --build -d
    ```

9. Acesse a aplicação via navegador usando o IP público da instância EC2:
    http://SEU_IP_PUBLICO:8080

