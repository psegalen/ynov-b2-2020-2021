import { formaterDuree, formaterMontant, id } from "../utils.js";
import Media from "./Media.js";

export default class Movie extends Media {
  constructor(data) {
    super(data);
  }

  populate() {
    const film = this.data;

    id("nom").innerText = film.title;

    id("finances").innerText = `Budget : ${
      film.budget ? formaterMontant(film.budget) : "?"
    } / Revenue : ${
      film.revenue ? formaterMontant(film.revenue) : "?"
    }`;

    id("temps").innerText = "Durée : " + formaterDuree(film.runtime);

    id("annee").innerText = film.release_date.split("-")[0];

    id("serie").style.display = "none";

    super.populate();
  }
}
