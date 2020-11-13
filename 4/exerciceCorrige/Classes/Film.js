import Media from "./Media.js";
import Helpers from "../Helpers.js";

export default class Film extends Media {
  constructor(data) {
    super(data);
    this.cacherPanneau("serie");
  }

  remplir() {
    super.remplir();
    Helpers.remplirChamp("nom", this.data.title);
    document.title = `Film : ${this.data.title}`;
    this.remplirAnnee(this.data.release_date);

    const nbHeures = Math.floor(this.data.runtime / 60);
    const nbMinutes = this.data.runtime % 60;
    Helpers.remplirChamp(
      "duree",
      `${nbHeures} h ${nbMinutes.toString().padStart(2, "0")} mn`
    );

    Helpers.remplirChamp(
      "budget",
      numeral(this.data.budget / 1.1).format("0,0 a $")
    );
    Helpers.remplirChamp(
      "revenus",
      numeral(this.data.revenue / 1.1).format("0,0 a $")
    );

    if (this.data.budget !== 0 && this.data.revenue !== 0) {
      if (this.data.budget > this.data.revenue) {
        Helpers.id("rentable").style.display = "none";
        Helpers.id("pasRentable").style.display = "";
      } else {
        Helpers.id("rentable").style.display = "";
        Helpers.id("pasRentable").style.display = "none";
      }
    } else {
      Helpers.id("rentable").style.display = "none";
      Helpers.id("pasRentable").style.display = "none";
    }
  }
}
