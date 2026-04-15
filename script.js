let tarefas = [];

const button = document.getElementById("addBtn");
button.addEventListener("click", addTask);

function addTask() {
  const input = document.getElementById("input-box");
  const value = input.value;

  const newTask = {
    texto: value,
    concluida: false,
  };

  if (value.trim() === "") {
    alert("Inclua uma tarefa!");
    return;
  }

  tarefas.push(newTask);
  saveTasks();
  renderTasks();

  input.value = "";
  input.focus();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tarefas));
}

function loadTasks() {
  const data = localStorage.getItem("tasks");
  if (data) {
    tarefas = JSON.parse(data);
  }
}

function renderTasks() {
  const ul = document.getElementById("tasklist");

  ul.innerHTML = "";

  for (let i = 0; i < tarefas.length; i++) {
    const li = document.createElement("li");
    li.textContent = tarefas[i].texto;
    if (tarefas[i].concluida) {
      li.style.textDecoration = "line-through";
    }

    const checkButton = document.createElement("button");
    checkButton.textContent = "✅";
    checkButton.classList.add("check-btn");

    const uncheckButton = document.createElement("button");
    uncheckButton.textContent = "❌";
    uncheckButton.classList.add("delete-btn");

    checkButton.addEventListener("click", () => {
      tarefas[i].concluida = !tarefas[i].concluida;
      renderTasks();
    });

    uncheckButton.addEventListener("click", () => {
      tarefas.splice(i, 1);
      renderTasks();
    });

    li.appendChild(uncheckButton);
    li.appendChild(checkButton);
    ul.appendChild(li);
  }
}

loadTasks();
renderTasks();
