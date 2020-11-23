import {
  createTask,
  deleteTask,
  getTasks,
  setTaskIsCompleted,
} from "./api.js";

let ourTasks = [];

const managePanelVisibility = (panelId, visiblePanelId) => {
  const panel = document.getElementById(panelId);
  if (panelId === visiblePanelId) {
    panel.classList.remove("uk-hidden");
  } else {
    panel.classList.add("uk-hidden");
  }
};

const showPanel = (panelId) => {
  managePanelVisibility("tasks-loading", panelId);
  managePanelVisibility("tasks-list", panelId);
  managePanelVisibility("tasks-empty", panelId);
  managePanelVisibility("tasks-new", panelId);
  if (panelId === "tasks-loading" || panelId === "tasks-new") {
    document.getElementById("task-new").classList.add("uk-hidden");
  } else {
    document.getElementById("task-new").classList.remove("uk-hidden");
  }
};

const checkboxChanged = (isChecked, taskId) => {
  setTaskIsCompleted(taskId, isChecked)
    .then((result) => {
      const newTaskState = result.data;
      for (let i = 0; i < ourTasks.length; i++) {
        if (ourTasks[i].id === taskId) {
          ourTasks[i] = newTaskState;
        }
      }
      refreshOrder();
    })
    .catch((err) => {
      console.error(
        "Something went wrong when setting task is completed",
        err
      );
      alert("Une erreur est survenue sur le serveur");
      refreshOrder();
    });
};

const deleteButtonClicked = (taskId) => {
  console.log("Delete task", taskId);
  deleteTask(taskId)
    .then(() => {
      const newOurTasks = [];
      for (let i = 0; i < ourTasks.length; i++) {
        const task = ourTasks[i];
        if (task.id !== taskId) {
          newOurTasks.push(task);
        }
      }
      ourTasks = newOurTasks;
      refreshOrder();
    })
    .catch((err) => {
      console.error("Something went wrong when deleting task", err);
      alert("Une erreur est survenue sur le serveur");
    });
};

const renderTask = (task) => {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `checkbox_${task.id}`;
  checkbox.checked = task.isCompleted;
  li.appendChild(checkbox);
  const title = document.createElement("label");
  title.innerText = task.title;
  title.setAttribute("for", `checkbox_${task.id}`);
  title.style.textDecoration = task.isCompleted ? "line-through" : "";
  li.appendChild(title);
  checkbox.addEventListener("change", (evt) =>
    checkboxChanged(evt.target.checked, task.id, title, checkbox)
  );
  const deleteButton = document.createElement("a");
  deleteButton.href = "#";
  deleteButton.setAttribute("uk-icon", "trash");
  deleteButton.addEventListener("click", () =>
    deleteButtonClicked(task.id, li)
  );
  li.appendChild(deleteButton);
  document.getElementById("tasks").appendChild(li);
};

const refreshOrder = () => {
  document.getElementById("tasks").innerText = "";
  const tasks = ourTasks.sort((a, b) => {
    if (a.isCompleted && !b.isCompleted) {
      return 1;
    } else {
      return -1;
    }
  });
  tasks.forEach((task) => renderTask(task));
};

const addTask = () => {
  const title = document.getElementById("task-title").value;
  createTask(title)
    .then((result) => {
      const newTask = result.data;
      ourTasks.push(newTask);
      refreshOrder();
      showPanel("tasks-list");
    })
    .catch((err) => {
      alert("Impossible de créer la tâche !");
      console.error("Could not create task!", err);
    });
};

export const initTasks = () => {
  showPanel("tasks-loading");
  getTasks().then((tasks) => {
    ourTasks = tasks;
    console.debug(ourTasks);
    refreshOrder();
    if (tasks.length > 0) {
      showPanel("tasks-list");
    } else {
      showPanel("tasks-empty");
    }
    document
      .getElementById("task-new")
      .addEventListener("click", () => showPanel("tasks-new"));
    document
      .getElementById("task-add")
      .addEventListener("click", addTask);
  });
};
