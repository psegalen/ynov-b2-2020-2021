import utils from "../utils.js";

const incrementer = event => {
  const button = event.target;
  const value = parseInt(button.innerText);
  button.innerText = value + 1;
};

const init = () => {
  utils.showPage("home");
  const links = document.getElementsByClassName("itemLink");
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    link.addEventListener("click", e => {
      loadItem(i + 1);
      e.preventDefault();
    });
  }
  document.getElementById("compteur").addEventListener("click", incrementer);
  document.getElementById("backLink").addEventListener("click", e => {
    utils.showPage("home");
    e.preventDefault();
  });
};

const loadItem = id => {
  utils.showPage("item");
  utils.fill("numeroFiche", id);
};

window.addEventListener("load", init);
