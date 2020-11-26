import {
  deleteTask,
  getTasks,
  patchTask,
  postTask,
  setTaskIsCompleted,
} from "./api.js";

let ourTasks = [];
let ourListId = "";
let isUpdating = false;
let updatingTaskId = "";

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

const deleteButtonClicked = (taskId) => {
  deleteTask(taskId)
    .then(() => {
      // Delete task from ourTasks
      ourTasks = ourTasks.filter((task) => task.id !== taskId);
      buildList(ourTasks);
    })
    .catch((err) => {
      console.error("Something happened when deleting a task", err);
      alert("Une erreur est survenue côté serveur");
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
  const label = document.createElement("label");
  label.setAttribute("for", `checkbox_${task.id}`);
  if (task.isCompleted) {
    label.className = "striked";
  }
  li.appendChild(label);
  const titleSpan = document.createElement("span");
  titleSpan.innerText = task.title;
  titleSpan.className = "span-title";
  label.appendChild(titleSpan);
  if (task.details.length > 0) {
    const detailsSpan = document.createElement("span");
    detailsSpan.innerText = task.details;
    detailsSpan.className = "span-details";
    label.appendChild(detailsSpan);
  }
  if (task.due !== null) {
    const dueSpan = document.createElement("span");
    const dueDate = new Date(task.due);
    dueSpan.innerText = dueDate.toLocaleDateString();
    dueSpan.className = "span-due";
    label.appendChild(dueSpan);
    if (dueDate.getTime() < Date.now() && !task.isCompleted) {
      titleSpan.style.color = "red";
      titleSpan.style.fontWeight = "bold";
    }
  }
  const updateButton = document.createElement("a");
  updateButton.setAttribute("uk-icon", "pencil");
  updateButton.addEventListener("click", () =>
    prepareFormForUpdate(task)
  );
  li.appendChild(updateButton);
  const deleteButton = document.createElement("a");
  deleteButton.setAttribute("uk-icon", "trash");
  deleteButton.addEventListener("click", () =>
    deleteButtonClicked(task.id)
  );
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

const prepareFormForAdd = () => {
  isUpdating = false;
  document.getElementById("task-new-title").value = "";
  document.getElementById("task-new-details").value = "";
  document.getElementById("task-new-due").value = "";
  document.getElementById("task-span-title").innerText =
    "Nouvelle tâche";
  showPanel("tasks-new");
};

const addNewTask = () => {
  const title = document.getElementById("task-new-title").value;
  const details = document.getElementById("task-new-details").value;
  const due = document.getElementById("task-new-due").value;
  const dueDate = new Date(due);
  // Create task
  postTask(
    title,
    ourListId,
    details,
    due.length > 0 ? dueDate.toISOString() : undefined
  )
    .then((task) => {
      // Update ourTasks
      ourTasks.push(task);
      buildList(ourTasks);
      showPanel("tasks-list");
    })
    .catch((err) => {
      console.error("Could not create task", err);
      alert("Une erreur est survenue côté serveur");
    });
};

const updateTask = () => {
  const title = document.getElementById("task-new-title").value;
  const details = document.getElementById("task-new-details").value;
  const due = document.getElementById("task-new-due").value;
  const dueDate = new Date(due);
  // Create task
  patchTask(
    title,
    updatingTaskId,
    details,
    due.length > 0 ? dueDate.toISOString() : undefined
  )
    .then((newTaskState) => {
      // Replace task in ourTasks by its new state
      for (let i = 0; i < ourTasks.length; i++) {
        if (ourTasks[i].id === updatingTaskId) {
          ourTasks[i] = newTaskState;
          break;
        }
      }
      buildList(ourTasks);
      showPanel("tasks-list");
    })
    .catch((err) => {
      console.error("Could not update task", err);
      alert("Une erreur est survenue côté serveur");
    });
};

const prepareFormForUpdate = (task) => {
  isUpdating = true;
  updatingTaskId = task.id;
  document.getElementById("task-new-title").value = task.title;
  document.getElementById("task-new-details").value = task.details;
  document.getElementById("task-new-due").value = task.due.split(
    "T"
  )[0];
  document.getElementById("task-span-title").innerText =
    "Mise à jour d'une tâche";
  showPanel("tasks-new");
};

const addOrUpdateTask = () => {
  if (isUpdating) {
    updateTask();
  } else {
    addNewTask();
  }
};

export const refreshAllTasks = (listId) => {
  showPanel("tasks-loading");
  ourListId = listId;
  getTasks(listId).then((tasks) => {
    ourTasks = tasks;
    buildList(tasks);
  });
};

const initTasks = () => {
  document
    .getElementById("task-new-link")
    .addEventListener("click", prepareFormForAdd);
  document
    .getElementById("task-new-button")
    .addEventListener("click", addOrUpdateTask);
  document
    .getElementById("task-new-cancel")
    .addEventListener("click", () => showPanel("tasks-list"));
};

export default initTasks;
