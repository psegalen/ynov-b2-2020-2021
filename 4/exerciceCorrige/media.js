import Helpers from "./Helpers.js";
import Serie from "./Classes/Serie.js";
import Film from "./Classes/Film.js";

// load a locale
numeral.register("locale", "fr", {
  delimiters: {
    thousands: " ",
    decimal: ","
  },
  abbreviations: {
    thousand: "K",
    million: "M",
    billion: "MM",
    trillion: "MMM"
  },
  ordinal: function(number) {
    return number === 1 ? "er" : "ème";
  },
  currency: {
    symbol: "€"
  }
});

// switch between locales
numeral.locale("fr");

export const apiKey = "97719463bea4bd4b5902c1a735c0556a";

const traiterMedia = (data, type) => {
  const media = type == "movie" ? new Film(data) : new Serie(data);
  media.remplir();
};

const traiterImages = images => {
  const divImages = Helpers.id("media-images");
  divImages.innerText = "";
  images.map(image => {
    const img = document.createElement("img");
    img.src = Helpers.imageUrl(image.file_path);
    divImages.appendChild(img);
  });
};

const traiterSimilaires = (similaires, type) => {
  Helpers.id("similaires").innerText = "";
  for (let i = 0; i < similaires.length; i++) {
    const element = similaires[i];
    const lien = document.createElement("a");
    lien.style.display = "block";
    lien.innerText = type === "movie" ? element.title : element.name;
    lien.href = `#${type}/${element.id}`;
    Helpers.id("similaires").appendChild(lien);
  }
};

const chargerMedia = (type, id) => {
  const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=fr-FR`;
  axios
    .get(url)
    .then(response => traiterMedia(response.data, type))
    .catch(error => {
      if (error.response && error.response.status == 404) {
        alert("Média introuvable !");
      } else {
        console.error(error);
      }
    });

  const imagesUrl = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${apiKey}`;
  axios
    .get(imagesUrl)
    .then(response => traiterImages(response.data.backdrops))
    .catch(error => console.error(error));

  const similarUrl = `https://api.themoviedb.org/3/${type}/${id}/similar?api_key=${apiKey}&language=fr-FR`;
  axios
    .get(similarUrl)
    .then(response => traiterSimilaires(response.data.results, type));
};

export default chargerMedia;
