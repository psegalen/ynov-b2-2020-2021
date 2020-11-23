import { deleteList, getLists, postList } from "./api.js";

let ourLists = [];

const showPanel = (panelId) => {
  // Hide all panels
  const panels = document.getElementsByClassName("panel");
  for (let i = 0; i < panels.length; i++) {
    panels[i].setAttribute("hidden", "true");
  }
  // Show the panel with panelId
  document.getElementById(panelId).removeAttribute("hidden");
  if (panelId === "lists-loading" || panelId === "lists-new") {
    document
      .getElementById("list-new-link")
      .setAttribute("hidden", "true");
  } else {
    document
      .getElementById("list-new-link")
      .removeAttribute("hidden");
  }
};

const deleteButtonClicked = (listId) => {
  deleteList(listId)
    .then(() => {
      // Delete list from ourLists
      ourLists = ourLists.filter((list) => list.id !== listId);
      buildList(ourLists);
    })
    .catch((err) => {
      console.error("Something happened when deleting a list", err);
      alert("Une erreur est survenue côté serveur");
    });
};

const createList = (list, ul) => {
  const li = document.createElement("li");
  li.className = "list-li";
  const link = document.createElement("a");
  link.innerText = list.title;
  link.href = `#tasks/${list.id}`;
  link.className = "list-tasks-link";
  li.appendChild(link);
  const deleteButton = document.createElement("a");
  deleteButton.setAttribute("uk-icon", "trash");
  deleteButton.addEventListener("click", () =>
    deleteButtonClicked(list.id)
  );
  li.appendChild(deleteButton);
  ul.appendChild(li);
};

const buildList = (lists) => {
  if (lists.length === 0) {
    showPanel("lists-empty");
  } else {
    // Build the list
    const ul = document.getElementById("lists-ul");
    ul.innerText = "";
    lists.forEach((list) => createList(list, ul));
    showPanel("lists-list");
  }
};

const addNewList = () => {
  const title = document.getElementById("list-new-title").value;
  // Create task
  postList(title)
    .then((list) => {
      // Update ourLists
      ourLists.push(list);
      buildList(ourLists);
      showPanel("lists-list");
      document.getElementById("list-new-title").value = "";
    })
    .catch((err) => {
      console.error("Could not create list", err);
      alert("Une erreur est survenue côté serveur");
    });
};

export const refreshAllLists = () => {
  showPanel("lists-loading");
  getLists().then((lists) => {
    ourLists = lists;
    buildList(lists);
  });
};

const initLists = () => {
  document
    .getElementById("list-new-link")
    .addEventListener("click", () => showPanel("lists-new"));
  document
    .getElementById("list-new-button")
    .addEventListener("click", addNewList);
  document
    .getElementById("list-new-cancel")
    .addEventListener("click", () => showPanel("lists-list"));
};

export default initLists;
