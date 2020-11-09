import { launchMedia } from "./media.js";
import { search } from "./search.js";

const selectPage = () => {
  const hash = document.location.hash.replace("#", "");
  const path = hash.split("/");
  switch (path[0]) {
    case "movie":
    case "tv":
      launchMedia(path[0], path[1]);
      break;
    case "search":
      search(path[1]);
      break;
    default:
      search();
      break;
  }
};

window.addEventListener("load", selectPage);
window.addEventListener("hashchange", selectPage);
