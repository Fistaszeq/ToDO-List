document.addEventListener('DOMContentLoaded', (event) => {
    loadTasks();
});

function dodaj() {
    var main = document.getElementById("todoList");

    var todoItem = document.createElement("div");
    todoItem.className = "todoItem";

    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "checkbox";
    checkbox.setAttribute("onclick", "check(this)");

    var todoText = document.createElement("input");
    todoText.type = "text";
    todoText.className = "todoText";
    todoText.value = "";

    var deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.setAttribute("onclick", "deleteItem(this)");
    deleteButton.textContent = "Delete";

    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);

    main.appendChild(todoItem);


    saveTasks();
}

function deleteItem(button) {
    var item = button.parentElement;
    item.remove();
    saveTasks();
}

function check(checkbox) {
    var item = checkbox.parentElement;
    if (checkbox.checked) {
        item.style.backgroundColor = "black";
        item.style.textDecoration = "line-through";
    } else {
        item.style.backgroundColor = "#7678FF";
        item.style.textDecoration = "none";
    }
    saveTasks();
}

function czystka() {
    var main = document.getElementById("todoList");
    main.innerHTML = "";
    localStorage.removeItem('tasks');
}

function saveTasks() {
    var tasks = [];
    var items = document.querySelectorAll('.todoItem');
    items.forEach(item => {
        var task = {
            text: item.querySelector('.todoText').value,
            checked: item.querySelector('.checkbox').checked
        };
        tasks.push(task);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        var main = document.getElementById("todoList");

        var todoItem = document.createElement("div");
        todoItem.className = "todoItem";

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.setAttribute("onclick", "check(this)");
        checkbox.checked = task.checked;

        var todoText = document.createElement("input");
        todoText.type = "text";
        todoText.className = "todoText";
        todoText.value = task.text;

        var deleteButton = document.createElement("button");
        deleteButton.className = "deleteButton";
        deleteButton.setAttribute("onclick", "deleteItem(this)");
        deleteButton.textContent = "Delete";

        todoItem.appendChild(checkbox);
        todoItem.appendChild(todoText);
        todoItem.appendChild(deleteButton);

        main.appendChild(todoItem);

        if (task.checked) {
            todoItem.style.backgroundColor = "black";
            todoItem.style.textDecoration = "line-through";
        } else {
            todoItem.style.backgroundColor = "#7678FF";
            todoItem.style.textDecoration = "none";
        }
    });
}


