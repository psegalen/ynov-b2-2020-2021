import { getTasks, setTaskIsCompleted } from "./api.js";

let ourTasks = [];

const showPanel = (panelId) => {
  // Hide all panels
  const panels = document.getElementsByClassName("panel");
  for (let i = 0; i < panels.length; i++) {
    panels[i].setAttribute("hidden", "true");
  }
  // Show the panel with panelId
  document.getElementById(panelId).removeAttribute("hidden");
  if (panelId === "tasks-loading" || panelId === "tasks-new") {
    document
      .getElementById("task-new-link")
      .setAttribute("hidden", "true");
  } else {
    document
      .getElementById("task-new-link")
      .removeAttribute("hidden");
  }
};

const setTaskCompletion = (taskId, isChecked) => {
  setTaskIsCompleted(taskId, isChecked)
    .then((newTaskState) => {
      // Replace task in ourTasks by its new state
      for (let i = 0; i < ourTasks.length; i++) {
        if (ourTasks[i].id === taskId) {
          ourTasks[i] = newTaskState;
          break;
        }
      }
      buildList(ourTasks);
    })
    .catch((err) => {
      console.error(
        "Something happened when setting task completion",
        err
      );
      alert("Une erreur est survenue côté serveur");
      buildList(ourTasks);
    });
};

const createTask = (task, ul) => {
  const li = document.createElement("li");
  li.className = "task-li";
  const checkbox = document.createElement("input");
  checkbox.id = `checkbox_${task.id}`;
  checkbox.type = "checkbox";
  checkbox.checked = task.isCompleted;
  checkbox.addEventListener("change", (evt) =>
    setTaskCompletion(task.id, evt.target.checked)
  );
  li.appendChild(checkbox);
  const title = document.createElement("label");
  title.setAttribute("for", `checkbox_${task.id}`);
  title.innerText = task.title;
  if (task.isCompleted) {
    title.className = "striked";
  }
  li.appendChild(title);
  const deleteButton = document.createElement("a");
  deleteButton.setAttribute("uk-icon", "trash");
  li.appendChild(deleteButton);
  ul.appendChild(li);
};

const buildList = (tasks) => {
  if (tasks.length === 0) {
    showPanel("tasks-empty");
  } else {
    // Build the list
    const ul = document.getElementById("tasks-ul");
    ul.innerText = "";
    tasks.forEach((task) => createTask(task, ul));
    showPanel("tasks-list");
  }
};

const addNewTask = () => {
  showPanel("tasks-list");
};

const refreshAllTasks = () =>
  getTasks().then((tasks) => {
    ourTasks = tasks;
    buildList(tasks);
  });

const initTasks = () => {
  showPanel("tasks-loading");
  document
    .getElementById("task-new-link")
    .addEventListener("click", () => showPanel("tasks-new"));
  document
    .getElementById("task-new-button")
    .addEventListener("click", addNewTask);
  refreshAllTasks();
};

export default initTasks;