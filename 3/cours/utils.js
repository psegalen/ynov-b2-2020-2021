const utils = {
  showPage: pageId => {
    const pages = document.getElementsByClassName("page");
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      if (page.id == pageId) page.style.display = "";
      else page.style.display = "none";
    }
  },
  fill: (elementId, text) => {
    document.getElementById(elementId).innerText = text;
  }
};

export default utils;
