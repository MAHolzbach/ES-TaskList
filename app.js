const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

loadEventListeners = () => {
  document.addEventListener("DOMContentLoaded", getTasks);
  form.addEventListener("submit", addTask);
  taskList.addEventListener("click", removeTask);
  clearBtn.addEventListener("click", clearList);
  filter.addEventListener("keyup", filterList);
};

getTasks = () => {
  let tasks;
  localStorage.getItem("tasks") === null
    ? (tasks = [])
    : (tasks = JSON.parse(localStorage.getItem("tasks")));

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "collection-item";
    li.appendChild(document.createTextNode(task));

    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';

    li.appendChild(link);

    taskList.appendChild(li);
  });
};

addTask = e => {
  if (taskInput.value === "") {
    alert("Add a task");
  }

  const li = document.createElement("li");
  li.className = "collection-item";
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement("a");
  link.className = "delete-item secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';

  li.appendChild(link);

  taskList.appendChild(li);

  storeTaskInLocalStorage(taskInput.value);

  taskInput.value = "";

  e.preventDefault();
};

storeTaskInLocalStorage = task => {
  let tasks;
  localStorage.getItem("tasks") === null
    ? (tasks = [])
    : (tasks = JSON.parse(localStorage.getItem("tasks")));

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

removeTask = e => {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
  e.preventDefault();
};

removeTaskFromLocalStorage = taskItem => {
  let tasks;
  localStorage.getItem("tasks") === null
    ? (tasks = [])
    : (tasks = JSON.parse(localStorage.getItem("tasks")));
  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

clearList = () => {
  let tasks;
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
};

filterList = e => {
  const tasks = document.querySelectorAll(".collection-item");
  const term = e.target.value.toLowerCase();
  tasks.forEach(task => {
    const item = task.firstChild.textContent.toLowerCase();
    if (item.indexOf(term) === -1) {
      task.style.display = "none";
    } else {
      task.style.display = "block";
    }
  });
};

loadEventListeners();
