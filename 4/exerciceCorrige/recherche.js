import Helpers from "./Helpers.js";
import { apiKey } from "./media.js";

const caseResultat = `
    <div class="resultat">
        <img class="resultat-poster" style="height: 200px" />
        <div class="resultat-infos">
            <div class="resultat-titre"></div>
            <div class="resultat-type"></div>
            <div class="resultat-annee"></div>
        </div>
    </div>
`;

const creerCase = resultat => {
  // Renvoyer tout le DOM d'une case
  const lien = document.createElement("a");
  lien.href = `#${resultat.media_type}/${resultat.id}`;
  lien.innerHTML = caseResultat;
  lien.querySelector(".resultat-poster").src = Helpers.posterUrl(
    resultat.poster_path
  );
  lien.querySelector(".resultat-titre").innerText =
    resultat.media_type === "movie" ? resultat.title : resultat.name;
  lien.querySelector(".resultat-type").innerText =
    resultat.media_type === "movie" ? "Film" : "Série";
  const date =
    resultat.media_type === "movie"
      ? resultat.release_date
      : resultat.first_air_date;
  lien.querySelector(".resultat-annee").innerText = date
    ? date.split("-")[0]
    : "";
  return lien;
};

const traiterResultats = data => {
  Helpers.id("resultats").innerHTML = "";
  // Boucle sur les résultats
  for (let i = 0; i < data.results.length; i++) {
    const resultat = data.results[i];
    if (resultat.media_type === "movie" || resultat.media_type === "tv") {
      Helpers.id("resultats").appendChild(creerCase(resultat));
    }
  }
  document.querySelector(".nbResultats").innerText = data.total_results;
};

const rechercher = () => {
  const mots = Helpers.id("motsRecherches").value;
  console.log("Recherche de", mots);

  const url = `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=fr-FR&query=${mots}`;
  axios
    .get(url)
    .then(response => traiterResultats(response.data))
    .catch(error => console.error(error));
};

export default rechercher;
