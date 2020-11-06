import { id, urlDuBackdrop, urlDuPoster } from "../utils.js";

export default class Media {
  constructor(data) {
    this.data = data;
  }

  populate() {
    console.log(urlDuBackdrop(this.data));

    id("description").innerText = this.data.overview;

    id("backdrop").style.background = `url(${urlDuBackdrop(
      this.data
    )}) center center`;

    id("poster").src = urlDuPoster(this.data);

    id("genre").innerText =
      this.data.genres && this.data.genres.length > 0
        ? this.data.genres[0].name
        : "";

    id(
      "votes"
    ).innerText = `${this.data.vote_average} (${this.data.vote_count})`;
  }
}
