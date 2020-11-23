import {
  createList,
  createTask,
  deleteList,
  getLists,
} from "./api.js";

let ourLists = [];

const managePanelVisibility = (panelId, visiblePanelId) => {
  const panel = document.getElementById(panelId);
  if (panelId === visiblePanelId) {
    panel.classList.remove("uk-hidden");
  } else {
    panel.classList.add("uk-hidden");
  }
};

const showPanel = (panelId) => {
  managePanelVisibility("lists-loading", panelId);
  managePanelVisibility("lists-list", panelId);
  managePanelVisibility("lists-empty", panelId);
  managePanelVisibility("lists-new", panelId);
  if (panelId === "lists-loading" || panelId === "lists-new") {
    document.getElementById("list-new").classList.add("uk-hidden");
  } else {
    document.getElementById("list-new").classList.remove("uk-hidden");
  }
};

const deleteButtonClicked = (listId) => {
  deleteList(listId)
    .then(() => {
      const newOurLists = [];
      for (let i = 0; i < ourLists.length; i++) {
        const list = ourLists[i];
        if (list.id !== listId) {
          newOurLists.push(list);
        }
      }
      ourLists = newOurLists;
      refreshOrder();
    })
    .catch((err) => {
      console.error("Something went wrong when deleting list", err);
      alert("Une erreur est survenue sur le serveur");
    });
};

const renderList = (list) => {
  const li = document.createElement("li");
  const link = document.createElement("a");
  link.className = "list-link";
  link.innerText = list.title;
  link.href = `#tasks/${list.id}`;
  li.appendChild(link);
  const deleteButton = document.createElement("a");
  deleteButton.href = "javascript:void(0)";
  deleteButton.setAttribute("uk-icon", "trash");
  deleteButton.addEventListener("click", () =>
    deleteButtonClicked(list.id, li)
  );
  li.appendChild(deleteButton);
  document.getElementById("lists").appendChild(li);
};

const refreshOrder = () => {
  document.getElementById("lists").innerText = "";
  const lists = ourLists.sort((a, b) => {
    if (a.isCompleted && !b.isCompleted) {
      return 1;
    } else {
      return -1;
    }
  });
  lists.forEach((list) => renderList(list));
};

const addList = () => {
  const title = document.getElementById("list-title").value;
  createList(title)
    .then((result) => {
      const newList = result.data;
      ourLists.push(newList);
      refreshOrder();
      showPanel("lists-list");
      // Don't forget to reset the input value after creating the list
      document.getElementById("list-title").value = "";
    })
    .catch((err) => {
      alert("Impossible de créer la liste !");
      console.error("Could not create list!", err);
    });
};

export const showLists = () => {
  showPanel("lists-loading");
  getLists().then((lists) => {
    ourLists = lists;
    refreshOrder();
    if (lists.length > 0) {
      showPanel("lists-list");
    } else {
      showPanel("lists-empty");
    }
  });
};

export const initLists = () => {
  document
    .getElementById("list-new")
    .addEventListener("click", () => showPanel("lists-new"));
  document
    .getElementById("list-add")
    .addEventListener("click", addList);
};
