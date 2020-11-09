import { initMedia } from "./media.js";
import { initSearch } from "./search.js";
import { id } from "./utils.js";

const selectPage = () => {
  const hash = document.location.hash.replace("#", "");
  const path = hash.split("/");
  switch (path[0]) {
    case "movie":
    case "tv":
      initMedia(path[0], path[1]);
      break;
    case "search":
      initSearch(path[1]);
      break;
    default:
      initSearch();
      break;
  }
};

const launchSearch = () => {
  const searchTerm = encodeURIComponent(id("motsRecherches").value);
  if (searchTerm.length !== 0) {
    document.location.hash = `#search/${searchTerm}`;
  } else {
    alert("Merci de renseigner le champs texte");
  }
};

window.addEventListener("load", selectPage);
window.addEventListener("hashchange", selectPage);
id("boutonRechercher").addEventListener("click", launchSearch);
