import { getTasks } from "./api.js";

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

const createTask = (task, ul) => {
  const li = document.createElement("li");
  li.className = "task-li";
  const checkbox = document.createElement("input");
  checkbox.id = `checkbox_${task.id}`;
  checkbox.type = "checkbox";
  li.appendChild(checkbox);
  const title = document.createElement("label");
  title.setAttribute("for", `checkbox_${task.id}`);
  title.innerText = task.title;
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

export const initTasks = () => {
  showPanel("tasks-loading");
  document
    .getElementById("task-new-link")
    .addEventListener("click", () => showPanel("tasks-new"));
  getTasks().then((tasks) => {
    buildList(tasks);
  });
};
