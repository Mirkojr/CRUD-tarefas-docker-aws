const btnAbrir = document.getElementById("btn-abrir-form");
const formContainer = document.getElementById("form-container");
const tituloInput = document.getElementById('input-titulo');
const descricaoInput= document.getElementById('input-descricao');
const listaTarefas = document.getElementById('lista-tarefas');
const URL_API = 'http://localhost:3000/tarefas';

//http://13.220.49.88:3000/tarefas

btnAbrir.addEventListener('click', function(){
    formContainer.classList.remove("escondido");
})

function cancelarCriacao(){
    formContainer.classList.add("escondido");
}

function limparDados(){
    tituloInput.value = "";
    descricaoInput.value = "";
}

//lembrar: as tags input e textarea guardam oq o usuario digita no atributo 'value'
function salvarTarefa(){
    const titulo = tituloInput.value;
    const descricao = descricaoInput.value;

    
    fetch(URL_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: titulo,
            descricao: descricao
        })
    }).then(resposta => {
        if(resposta.ok){
            cancelarCriacao();
            carregarTarefas();
            limparDados();
            alert('Tarefa salva!');
        } else {
            alert('Erro ao salvar tarefa')
        }
    }).catch(erro => {
        console.error("Erro na comunicação: ", erro);
    })
}

function alternarDescricao(id){
    const divDetalhes = document.getElementById(`desc-${id}`);
    divDetalhes.classList.toggle("escondido");
}

function excluirTarefa(id){
    if(confirm("Tem certeza que deseja excluir?")){
        fetch(`${URL_API}/${id}`, {
            method: 'DELETE'
        })
        .then(res=> {
            if(res.ok){
                carregarTarefas();
            }else {
                alert("Erro ao excluir");
            }
        })
    }
}

function concluirTarefa(id){
    fetch(`${URL_API}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ concluida: true})
    })
    .then(res=> {
        if(res.ok){
            carregarTarefas();
        }else{
            alert("Erro ao concluir tarefa");
        }
    })
}
function carregarTarefas(){
    fetch(URL_API)
        .then(resposta => resposta.json())
        .then(tarefas => {
            // limpar antes de desenhar
            listaTarefas.innerHTML = "";
            tarefas.forEach(tarefa => {
                const li = document.createElement('li');
                if (tarefa.concluida) { 
                    li.classList.add('concluida');
                }
                // ` crase para poder pular linha e por variávels ${}
                li.innerHTML = `
                    <div class="cabecalho-tarefa">
                        <strong>${tarefa.titulo}</strong>
                        <button onclick="alternarDescricao(${tarefa.id})">👁️</button>
                    </div>
                    
                    <div id="desc-${tarefa.id}" class="detalhes-tarefa escondido">
                        <p>${tarefa.descricao || "Sem descrição"}</p>
                        <div class="acoes">
                            <button onclick="concluirTarefa(${tarefa.id})">✅</button>
                            <button onclick="excluirTarefa(${tarefa.id})">🗑️</button>
                        </div>
                    </div>
                `;
                listaTarefas.appendChild(li);
            })
        }).catch(erro => console.error("Erro ao listar: ", erro));
}


// chamando assim que o site abrir para carregar as tarefas: 
carregarTarefas();