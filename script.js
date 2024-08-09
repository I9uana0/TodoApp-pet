const form = document.getElementById('form');
const taskInput = document.getElementById('taskInput');
const tasksList = document.getElementById('tasksList');
const emptyList = document.getElementById('emptyList')

form.addEventListener('submit', addTask)
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach((task) => {

});

checkEmptyList();

function checkEmptyList() {
    const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
    <img src="./images/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
</li>`

    if (tasks.length == 0) {
        tasksList.insertAdjacentHTML("afterbegin", emptyListHTML)
    }

    if (tasks.length > 0) {
        const emptyListEl = document.getElementById('emptyList');
        emptyListEl && emptyListEl.remove();
    }

}

function addTask(e) {
    e.preventDefault();
    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    tasks.push(newTask);

    saveToLocalStorage();

    const cssClass = newTask.done ? "task-title task-title--done" : "task-title"

    const taskHTML = `
    <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${newTask.text}</span>
            <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./images/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./images/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
    </li>
    `

    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    taskInput.value = '';

    taskInput.focus();

    checkEmptyList();
}

function deleteTask(e) {
    if (e.target.dataset.action !== 'delete') return

    const parentNode = e.target.closest('li');
    const id = parentNode.id;

    tasks = tasks.filter((task) => task.id != id);

    saveToLocalStorage();

    parentNode.remove();

    checkEmptyList();
}

function doneTask(e) {
    if (e.target.dataset.action !== 'done') return

    const parentNode = e.target.closest('li');

    const id = parentNode.id;
    const task = tasks.find((task) => task.id == id);
    task.done = !task.done;

    saveToLocalStorage()

    const taskTitle = parentNode.querySelector(".task-title");
    taskTitle.classList.toggle('task-title--done');
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}