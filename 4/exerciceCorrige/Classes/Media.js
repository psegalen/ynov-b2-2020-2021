import Helpers from "../Helpers.js";

export default class Media {
  constructor(data) {
    this.data = data;
  }

  remplir() {
    Helpers.remplirChamp("description", this.data.overview);
    Helpers.id("backdrop").style.backgroundImage = `url(${Helpers.backdropUrl(
      this.data.backdrop_path
    )})`;
    Helpers.id("poster").src = Helpers.posterUrl(this.data.poster_path);
    Helpers.remplirChamp(
      "genre",
      this.data.genres.map(item => item.name).join(", ")
    );
    Helpers.remplirChamp("moyenne", this.data.vote_average);
    Helpers.remplirChamp(
      "nbVotes",
      numeral(this.data.vote_count).format("0,0 a")
    );
    Helpers.id("moyenne").style.color =
      this.data.vote_average > 7
        ? "#00FF00"
        : this.data.vote_average < 5
        ? "#FF0000"
        : "";
  }

  cacherPanneau(id) {
    const panneaux = document.getElementsByClassName("panneau");
    for (let i = 0; i < panneaux.length; i++) {
      const panneau = panneaux[i];
      panneau.style.display = panneau.id === id ? "none" : "";
    }
  }

  remplirAnnee(date) {
    Helpers.remplirChamp("annee", date.split("-")[0]);
  }
}
