import utils from "../utils.js";

const initItem = id => {
  utils.showPage("item");
  utils.fill("numeroFiche", id);
};

export default initItem;
