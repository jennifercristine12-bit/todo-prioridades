//Link
const API = "http://localhost:8091"
//selecao de elementos
const todoForm = document.querySelector("#todo-form");
const removeForm = document.querySelector("#remove-form");
const todoInput = document.querySelector("#todo-input");
const addBtn = document.querySelector("#add")
const todoDescription = document.querySelector("#descricao")
const selector = document.querySelector("#seletor")
const formControl = document.querySelector(".form-control")
const todoList = document.querySelector("#todo-list");

const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");

const eraseAllBtn = document.querySelector("#removeAll");
const filterBtn = document.querySelector("#filter-select");
let oldInputValue;
let editarTarefa = false;
//eventos
document.addEventListener("DOMContentLoaded",carregarLista)
todoForm.addEventListener("submit", async (e)=>{
    e.preventDefault()
    alert(`tarefa salva`)
    const nome = todoInput.value
    const descricao = todoDescription.value
    const prioridade = selector.value
    const todos = {nome, descricao, prioridade}
    try {
        let response;
        if (!editarTarefa) {
            response = await fetch(API + "/itens/cadastrar", {
                method: 'POST',
                headers: {
                    "Content-type": "application/JSON"
                },
                body: JSON.stringify(todos)

            });

        }

        if (!response.ok) throw new Error("erro ao carregar tarefas")
        todoForm.reset()
        await carregarLista()


    } catch (error) {
        console.error("Erro", error)

    }

})
eraseAllBtn.addEventListener("click", ()=>{
    alert("Tarefas apagadas:todas");
    apagarLista()})
//Funcoes

//carregar
async function apagarLista(){
    try {
        response = await fetch(API + "/tarefa/remover", {
            method: 'DELETE',
            headers: {
                "Content-type": "application/JSON"
            }
        })
    }
    catch(error){

        console.log(error)
    }

}
async function carregarLista() {
    try {
        const resposta = await fetch(API + "/itens/listar")
        if (!resposta.ok) throw new Error("Erro: não é possivel carregar a lista")
        const lista = await resposta.json()
        exibirLista(lista)

    } catch (error) {

    }
}

function exibirLista(lista) {
    todoList.innerHTML = ""
    lista.map((tarefa, key) => {
        const todo = document.createElement("div");
        todo.classList.add("todo");
        switch (tarefa.prioridade) {
            case "Alta":
                todo.classList.add("high");
                break;
            case "Media":
                todo.classList.add("medium");
                break;
            case "Baixa":
                todo.classList.add("low");
                break;

        }
        if (tarefa.estaConcluida) {
            todo.classList.add("done")
        } else {
            todo.classList.remove("done")
        }
        todo.innerHTML = `
 <h3>${tarefa.nome}</h3>
 <p>${tarefa.descricao}</p>
 
 <button class="finish-todo">
 <i class="fa-solid fa-check"></i>
 </button><button class="edit-todo">
 <i class="fa-solid fa-pen"></i></button>
 <button class="remove-todo">
 <i class="fa-solid fa-xmark"></i>
 </button>
 `
        const finishBtn = todo.querySelector(".finish-todo");

        finishBtn.addEventListener("click", async () => {
            alert(`Tarefa concluida: ${tarefa.nome}`)
            const novoEstado = !tarefa.estaConcluida;
            const sucesso = await isDoneBtn(tarefa.id, tarefa.estaConcluida);

            if (sucesso) {
                tarefa.estaConcluida = novoEstado;

            }
        });
        const removeBtn = todo.querySelector(".remove-todo")
        removeBtn.addEventListener("click", async () => {
            alert(`Tarefa apagada: ${tarefa.nome}`)
            try {
                response = await fetch(API + `/tarefa/remover/${tarefa.id}`, {
                    method: 'DELETE',
                    headers: {
                        "Content-type": "application/JSON"
                    },
                    body: JSON.stringify(tarefa)
                })
            } catch (error) {

                console.log(error)
            }
        })
        todoList.append(todo)

        const editTodo = todo.querySelector(".edit-todo");
        editTodo.addEventListener("click", async () => {
            editarTarefa = !editarTarefa;
            try {

                response = await fetch(API + "/itens/alterar", {
                    method: 'PUT',
                    headers: {
                        "Content-type": "application/JSON"
                    },
                    body: JSON.stringify(tarefa)
                })
            } catch (error) {
                console.log(error);

            }

        })


    })
}




    const toggleForms = () => {
        addBtn.classList.toggle("hide")
        formControl.classList.toggle("hide")
    };
    const updateTodo = (text) => {
        const todos = document.querySelectorAll(".todo");
        todos.forEach((todo) => {
            let todoTitle = todo.querySelector("h3");
            if (todoTitle.innerText === oldInputValue) {
                todoTitle.innerText = text;
            }
        });
    }
//Eventos
    /*
    todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.clear();
    const formValue = new FormData(todoForm);
    const inputData = formValue.get("input");
    if (inputData) {
    saveTodo(inputData);
    }


    });
    */
    async function isDoneBtn(idTask, estaConcluida) {
        try {
            response = await fetch(API + `/tarefa/${idTask}/done`, {
                method: 'PATCH',
                headers: {
                    "Content-type": "application/JSON"
                },
                body: JSON.stringify(!estaConcluida)
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }

            return true;
        } catch (error) {
            console.error("Erro ao concluir tarefa:", error);
            return false;
        }

    }

    document.addEventListener("click", (e) => {
        let todoTitle;
        const targetEl = e.target;
        const parentEl = targetEl.closest("div");
        if (parentEl && parentEl.querySelector("h3")) {
            todoTitle = parentEl.querySelector("h3").innerText;
        }
        if (targetEl.classList.contains("finish-todo")) {
            parentEl.classList.toggle("done");

            //atualiza para o estaconcluida=true
        }
        if (targetEl.classList.contains("remove-todo")) {
            //remove o elemento
            parentEl.remove();
        }
        if (targetEl.classList.contains("edit-todo")) {
            editInput.value = todoTitle;
            oldInputValue = todoTitle;
            toggleForms();
        }
    });
    /*

    editTodo.addEventListener("submit", (e) => {
    e.preventDefault();
    toggleForms();

    const editInputValue = editInput.value;
    if (editInputValue) {
    updateTodo(editInputValue);
    }


    });
    */
    cancelEditBtn.addEventListener("click", (e) => {
        e.preventDefault();
        toggleForms();
    })

