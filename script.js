//CRIANDO VARIAVIES ENTRADA DE DADOS
const input = document.querySelector(".input-tesk")
const button = document.querySelector(".button-task")
const lista = document.querySelector(".list-task")
let indexEditando = null

let tarefas = JSON.parse(localStorage.getItem("lista")) || []
//ADICIONADO DATA E HORA DA TAREFA
tarefas = tarefas.map(tarefa => {
    return {
        ...tarefa,
        data: tarefa.data || new Date().toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    }
})

// INVOCANDO HTML TAREFAS 
function mostrarTarefas() {

    let novaLi = " "

    tarefas.forEach(function (tarefa, index) {
        const animacao = index === indexEditando ? "nova-tarefa" : ""
        novaLi =
            novaLi + `
            <li class="task ${tarefa.concluida ? "done" : ""} ${animacao}" >
                <img src="img/verificado.png" alt="tarefa-feita" onclick="concluirTarefa(${index})">
                
                <p onclick="editarTarefa(${index})">${tarefa.texto}</p>
                <span class="data">${tarefa.data}</span>
                <img src="img/lixeira.png" alt="apagar"onclick="deletarTarefa(${index})">
            </li>`
    })
    lista.innerHTML = novaLi

}
//DELETAR TAREFAS
function deletarTarefa(index) {
    tarefas.splice(index, 1)
    salvarTarefas()
    mostrarTarefas()

}
//MARCANDO COMO TAREFA CONCLUIDA
function concluirTarefa(index) {
    tarefas[index].concluida = !tarefas[index].concluida
    salvarTarefas()
    mostrarTarefas()

}
//SALVANDO TAREFAS LOCAL 
function salvarTarefas() {
    localStorage.setItem("lista", JSON.stringify(tarefas))

}
//ADICIONANDO TAREFA COM BOTÃO ENTER
function adicionarTarefa() {

    if (input.value.trim() === "") { //valida para nao aceitar tarefa vazia 
        return
    }
    //editar tarefa no input
    if (input.value === "") return
    if (indexEditando !== null) {
        tarefas[indexEditando].texto = input.value
        indexEditando = null
    } else {
        tarefas.push({
            texto: input.value,
            concluida: false,
            data: new Date().toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })
        })
    }

    salvarTarefas()
    mostrarTarefas(tarefas.length - 1)
    input.value = ""
}

button.addEventListener("click", adicionarTarefa)
//valida para adicionar tarefa com enter
input.addEventListener("keypress", function (event) {

    if (event.key === "Enter") {
        adicionarTarefa()
    }

})
// EDITAR TAREFA FUNCTION
function editarTarefa(index) {

    input.value = tarefas[index].texto

    indexEditando = index
}





mostrarTarefas()