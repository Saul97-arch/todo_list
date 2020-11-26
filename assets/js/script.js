const inputTarefa = document.querySelector("#tarefa");
const addBtn = document.querySelector("#add");
const lista = document.querySelector("#lista");

function createLi() {
  const li = document.createElement("li");
  return li;
}

function createRemoveBtn(li) {
  li.innerText += " ";
  const btn = document.createElement("button");
  btn.innerText = "Apagar";
  btn.setAttribute("class", "apagar");
  btn.setAttribute("title", "Apagar essa tarefa.");
  li.appendChild(btn);
}

function clearInput() {
  inputTarefa.value = "";
  inputTarefa.focus();
}

function saveTodo() {
  const liTodos = lista.querySelectorAll("li");
  const todoList = [];

  for (let todo of liTodos) {
    let textTodo = todo.innerText;
    textTodo = textTodo.replace("Apagar", "").trim();
    todoList.push(textTodo);
  }

  const todosJson = JSON.stringify(todoList);
  //So pode salvar string por isso JSON para string
  localStorage.setItem("todos", todosJson);
  console.log(todosJson);
}

function addTodo(inputText) {
  const li = createLi();
  li.innerText = inputText;
  lista.appendChild(li);
  clearInput();
  createRemoveBtn(li);
  saveTodo();
}

function addSavedTodos() {
  const todos = localStorage.getItem("todos");
  const todoList = JSON.parse(todos);

  for (let todo of todoList) {
    addTodo(todo);
  }
}

//Adicionar com enter
inputTarefa.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    if (!inputTarefa.value) return;
    addTodo(inputTarefa.value);
  }
});

addBtn.addEventListener("click", () => {
  // se o valor for vazio retorno seco
  if (!inputTarefa.value) return;
  addTodo(inputTarefa.value);
});

//Removendo elementos
document.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("apagar")) {
    el.parentElement.remove();
    //Aqui salva o apagamento das tarefas
    saveTodo();
  }
});

addSavedTodos();
