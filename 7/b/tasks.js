import {
  createTask,
  deleteTask,
  getTasks,
  patchTask,
  setTaskIsCompleted,
} from "./api.js";

let ourTasks = [];
let ourListId = "";
let isUpdating = false;
let updatingTaskId = "";

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

const updateButtonClicked = (task) => {
  isUpdating = true;
  updatingTaskId = task.id;
  document.getElementById("task-title").value = task.title;
  document.getElementById("task-details").value = task.details;
  if (task.due !== null) {
    document.getElementById("task-due").value = task.due.split(
      "T"
    )[0];
  } else {
    document.getElementById("task-due").value = "";
  }
  document.getElementById(
    "task-form-title"
  ).innerText = `Mettre à jour la tâche\n ${task.id}`;
  document.getElementById("task-add").innerText = "Mettre à jour";
  showPanel("tasks-new");
};

const renderTask = (task) => {
  const li = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `checkbox_${task.id}`;
  checkbox.checked = task.isCompleted;
  li.appendChild(checkbox);
  const label = document.createElement("label");
  label.setAttribute("for", `checkbox_${task.id}`);
  label.className = task.isCompleted
    ? "task-label-completed"
    : "task-label";
  li.appendChild(label);
  const titleSpan = document.createElement("span");
  titleSpan.innerText = task.title;
  titleSpan.className = "span-title";
  label.appendChild(titleSpan);
  const detailsSpan = document.createElement("span");
  detailsSpan.innerText = task.details;
  detailsSpan.className = "span-details";
  label.appendChild(detailsSpan);
  if (task.due !== null) {
    const dueSpan = document.createElement("span");
    const dueDate = new Date(task.due);
    dueSpan.innerText = `Deadline : ${dueDate.toLocaleDateString()}`;
    dueSpan.className = "span-due";
    label.appendChild(dueSpan);
    if (dueDate.getTime() < Date.now() && !task.isCompleted) {
      label.style.color = "red";
      titleSpan.style.fontWeight = "bold";
    }
  }
  checkbox.addEventListener("change", (evt) =>
    checkboxChanged(evt.target.checked, task.id)
  );
  const updateButton = document.createElement("a");
  updateButton.href = "javascript:void(0)";
  updateButton.setAttribute("uk-icon", "pencil");
  updateButton.addEventListener("click", () =>
    updateButtonClicked(task)
  );
  li.appendChild(updateButton);
  const deleteButton = document.createElement("a");
  deleteButton.href = "javascript:void(0)";
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
  const details = document.getElementById("task-details").value;
  const due = document.getElementById("task-due").value;
  const dueDate = new Date(due);
  createTask(
    title,
    ourListId,
    details,
    due.length > 0 ? dueDate.toISOString() : null
  )
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

const updateTask = () => {
  const title = document.getElementById("task-title").value;
  const details = document.getElementById("task-details").value;
  const due = document.getElementById("task-due").value;
  const dueDate = new Date(due);
  patchTask(
    title,
    updatingTaskId,
    details,
    due.length > 0 ? dueDate.toISOString() : null
  )
    .then((result) => {
      const newTaskState = result.data;
      for (let i = 0; i < ourTasks.length; i++) {
        if (ourTasks[i].id === updatingTaskId) {
          ourTasks[i] = newTaskState;
        }
      }
      refreshOrder();
      showPanel("tasks-list");
    })
    .catch((err) => {
      alert("Impossible de mettre à jour la tâche !");
      console.error("Could not update task!", err);
    });
};

export const showTasks = (listId) => {
  showPanel("tasks-loading");
  ourListId = listId;
  getTasks(listId).then((tasks) => {
    ourTasks = tasks;
    refreshOrder();
    if (tasks.length > 0) {
      showPanel("tasks-list");
    } else {
      showPanel("tasks-empty");
    }
  });
};

const taskNew = () => {
  isUpdating = false;
  document.getElementById("task-title").value = "";
  document.getElementById("task-details").value = "";
  document.getElementById("task-due").value = "";
  document.getElementById("task-form-title").innerText =
    "Nouvelle tâche";
  document.getElementById("task-add").innerText = "Ajouter";
  showPanel("tasks-new");
};

const addOrUpdateTask = () => {
  if (isUpdating) {
    updateTask();
  } else {
    addTask();
  }
};

export const initTasks = () => {
  document
    .getElementById("task-new")
    .addEventListener("click", taskNew);
  document
    .getElementById("task-add")
    .addEventListener("click", addOrUpdateTask);
  document
    .getElementById("task-cancel")
    .addEventListener("click", () => showPanel("tasks-list"));
};
