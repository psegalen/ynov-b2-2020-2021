import initHome from "./home.js";
import initItem from "./item.js";

const selectPage = () => {
  const hash = document.location.hash.replace("#", "");
  const path = hash.split("/");
  switch (path[0]) {
    case "item":
      initItem(path[1]);
      break;
    default:
    case "home":
      initHome();
      break;
  }
};

const incrementer = event => {
  const button = event.target;
  const value = parseInt(button.innerText);
  button.innerText = value + 1;
};

const init = () => {
  selectPage();
  document.getElementById("compteur").addEventListener("click", incrementer);
  document
    .getElementById("backLink")
    .addEventListener("click", () => window.history.back());
};

window.addEventListener("load", init);
window.addEventListener("hashchange", selectPage);
