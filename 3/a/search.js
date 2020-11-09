import { id } from "./utils.js";
import { urlDuPoster } from "./classes/Media.js";

const createCell = (media) => {
  const result = document.createElement("a");
  result.href = `#${media.media_type}/${media.id}`;
  result.className = "media";
  const img = document.createElement("img");
  img.src = urlDuPoster(media);
  img.className = "poster";
  result.appendChild(img);
  const infos = document.createElement("div");
  infos.className = "searchInfos";
  result.appendChild(infos);
  const titre = document.createElement("span");
  titre.innerText =
    media.media_type == "movie" ? media.title : media.name;
  titre.className = "titre";
  infos.appendChild(titre);
  const type = document.createElement("span");
  type.innerText = media.media_type == "movie" ? "Film" : "Série";
  type.className = "type";
  infos.appendChild(type);
  const annee = document.createElement("span");
  annee.innerText =
    media.media_type == "movie"
      ? media.release_date
        ? media.release_date.split("-")[0]
        : "Année inconnue"
      : media.first_air_date
      ? media.first_air_date.split("-")[0]
      : "Année inconnue";
  annee.className = "annee";
  infos.appendChild(annee);
  return result;
};

const clearResults = () => (id("listeResultats").innerText = "");

const handleResults = (data) => {
  id("nbResultats").innerText = `${data.total_results} résultat(s)`;
  clearResults();
  data.results.forEach((media) => {
    id("listeResultats").appendChild(createCell(media));
  });
};

export const search = (searchTerm) => {
  id("recherche").classList.remove("hidden");
  id("media").classList.add("hidden");
  if (!searchTerm || searchTerm.length === 0) {
    id("motsRecherches").value = "";
    clearResults();
    id("nbResultats").innerText = "";
  } else {
    id("motsRecherches").value = decodeURIComponent(searchTerm);
    axios
      .get(
        `https://api.themoviedb.org/3/search/multi?api_key=97719463bea4bd4b5902c1a735c0556a&language=fr-FR&query=${searchTerm}`
      )
      .then((result) => handleResults(result.data))
      .catch((error) => alert(error.message));
  }
};

export const launchSearch = () => {
  const searchTerm = id("motsRecherches").value;
  if (searchTerm.length === 0) {
    alert("Merci de renseigner le champs.");
  } else {
    document.location.hash = `#search/${encodeURIComponent(
      searchTerm
    )}`;
  }
};

id("boutonRechercher").addEventListener("click", launchSearch);
