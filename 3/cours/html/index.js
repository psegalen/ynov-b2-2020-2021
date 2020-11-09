const incrementer = event => {
  const button = event.target;
  const value = parseInt(button.innerText);
  button.innerText = value + 1;
};

const init = () => {
  document.getElementById("compteur").addEventListener("click", incrementer);
};
