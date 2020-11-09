import { id } from "../utils.js";
import { Media } from "./Media.js";

export class Serie extends Media {
  constructor(data) {
    super(data);
    console.log("New Serie!", data);
  }

  populate() {
    super.populate();

    this.populateSimilar("tv");

    id("film").style.display = "none";
    id("serie").style.display = "";

    const serie = this.data;

    id("nom").innerText = serie.name;

    id("annee").innerText = serie.first_air_date.split("-")[0];

    id("nbSaisons").innerText = serie.seasons.length;

    id("detailsSaisons").innerText = "";
    for (let i = 0; i < serie.seasons.length; i += 1) {
      const element = serie.seasons[i];
      const saison = document.createElement("li");
      saison.innerText = `${element.name} : ${element.episode_count} épisodes`;
      id("detailsSaisons").appendChild(saison);
    }

    document.title = `Série : ${serie.name}`;
  }
}
