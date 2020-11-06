import { id } from "../utils.js";
import { Media } from "./Media.js";

const formaterMontant = (montant) => {
  const montantEnEuros = Math.round(montant / 1.1);
  if (montantEnEuros > 1000000)
    return (montantEnEuros / 1000000).toFixed(1) + " M€";
  else if (montantEnEuros > 1000)
    return (montantEnEuros / 1000).toFixed(1) + " K€";
  else return montantEnEuros + " €";
};

const formaterDuree = (duree) => {
  if (duree) {
    const nbHeures = Math.floor(duree / 60);
    const nbMinutes = duree % 60;
    return nbHeures + " h " + nbMinutes;
  } else {
    return "inconnue";
  }
};

export class Movie extends Media {
  constructor(data) {
    super(data);
    console.log("New Movie!", data);
  }

  populate() {
    super.populate();

    id("serie").style.display = "none";

    const film = this.data;

    id("nom").innerText = film.title;

    id("budget").innerText = film.budget
      ? formaterMontant(film.budget)
      : "?";

    id("revenus").innerText = film.revenue
      ? formaterMontant(film.revenue)
      : "?";

    id("duree").innerText = formaterDuree(film.runtime);

    id("annee").innerText = film.release_date.split("-")[0];

    document.title = `Film : ${film.title}`;
  }
}
