import { id } from "./utils.js";
import { urlDuPoster } from "./classes/Media.js";

const clearResults = () => (id("listeResultats").innerText = "");

const creerCase = (media) => {
  const result = document.createElement("a");
  result.href = `#${media.media_type}/${media.id}`;
  result.className = "media";
  const img = document.createElement("img");
  img.src = urlDuPoster(media);
  img.className = "poster";
  result.appendChild(img);
  const infos = document.createElement("div");
  infos.className = "infosRecherche";
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

const handleResults = (result) => {
  clearResults();
  id("nbResultats").innerText = `${result.total_results} résultat(s)`;
  result.results.forEach((media) => {
    id("listeResultats").appendChild(creerCase(media));
  });
};

const search = (searchTerm) => {
  axios
    .get(
      "https://api.themoviedb.org/3/search/multi?api_key=97719463bea4bd4b5902c1a735c0556a&language=fr-FR&query=" +
        searchTerm
    )
    .then((result) => handleResults(result.data))
    .catch((error) => alert(error.message));
};

export const initSearch = (searchTerm) => {
  console.log("InitSearch");
  id("motsRecherches").value = decodeURIComponent(searchTerm || "");
  id("recherche").classList.remove("hidden");
  id("media").classList.add("hidden");
  if (!searchTerm || searchTerm.length === 0) {
    console.log("SearchTerm est vide, on réinitialise la recherche");
    clearResults();
    id("nbResultats").innerText = "";
  } else {
    console.log("SearchTerm : ", searchTerm);
    search(searchTerm);
  }
};
