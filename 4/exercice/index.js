import chargerMedia from "./media.js";
import Helpers from "./Helpers.js";
import rechercher from "./recherche.js";

const showPage = pageId => {
  const pages = document.getElementsByClassName("racine");
  for (let i = 0; i < pages.length; i++) {
    const page = pages[i];
    page.style.display = page.id === pageId ? "" : "none";
  }
};

const selectPage = () => {
  const hash = document.location.hash.replace("#", "");
  const path = hash.split("/");
  const page = path[0];
  switch (page) {
    case "movie":
    case "tv":
      showPage("media");
      chargerMedia(page, path[1]);
      break;
    default:
      // Page de recherche
      showPage("recherche");
      break;
  }
};

const init = () => {
  selectPage();
  Helpers.id("boutonRecherche").addEventListener("click", rechercher);
};

window.addEventListener("load", init);
window.addEventListener("hashchange", selectPage);
