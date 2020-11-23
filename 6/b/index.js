import { initLists, showLists } from "./lists.js";
import { initTasks, showTasks } from "./tasks.js";

// We'll handle the SPA here
const showPage = (pageId) => {
  const pages = document.getElementsByClassName("page");
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    if (page.id === pageId) {
      page.classList.remove("uk-hidden");
    } else {
      page.classList.add("uk-hidden");
    }
  }
};

const selectPage = () => {
  const hash = document.location.hash.replace("#", "");
  const path = hash.split("/");
  const page = path[0];
  switch (page) {
    case "tasks":
      showPage("tasks-page");
      showTasks(path[1]);
      break;
    default:
      showPage("lists-page");
      showLists();
      break;
  }
};

const init = () => {
  initLists();
  initTasks();
  selectPage();
};

window.addEventListener("load", init);
window.addEventListener("hashchange", selectPage);
