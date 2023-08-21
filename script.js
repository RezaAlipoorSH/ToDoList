const todoinput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

todoButton.addEventListener("click", addtodo);
todoList.addEventListener("click", deletecompletetodo);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", gettodos);

function addtodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoinput.value;

    savelocaltodo(todoinput.value);

    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    todoinput.value = "";

    const completedbutton = document.createElement("button");
    completedbutton.innerHTML = " <i class='fas fa-check'></i>";
    completedbutton.classList.add("complete-btn");
    todoDiv.appendChild(completedbutton);

    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = "<i class='fas fa-trash'></i>";
    trashbutton.classList.add("trash-btn");
    todoDiv.appendChild(trashbutton);
    todoList.appendChild(todoDiv);

}
function deletecompletetodo(event) {
    const item = event.target;
    console.log(item.parentElement);
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        removelocaltodo(todo);
        todo.remove();
    }
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

function filterTodo(event) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {

        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;
        }
    })
}

function savelocaltodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}
function removelocaltodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}
function gettodos() {

    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    };

    todos.forEach(function (todo) {

        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;

        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedbutton = document.createElement("button");
        completedbutton.innerHTML = "<i class='fas fa-check'></i>";
        completedbutton.classList.add("complete-btn");
        todoDiv.appendChild(completedbutton);

        const trashbutton = document.createElement("button");
        trashbutton.innerHTML = "<i class='fas fa-trash'></i>";
        trashbutton.classList.add("trash-btn");
        todoDiv.appendChild(trashbutton);
        todoList.appendChild(todoDiv);

    })
}