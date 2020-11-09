import { id } from "../utils.js";

const urlDuBackdrop = (media) =>
  media.backdrop_path
    ? "https://image.tmdb.org/t/p/w1280" + media.backdrop_path
    : "https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png";

const urlDuPoster = (media) =>
  media.poster_path
    ? "https://image.tmdb.org/t/p/w154" + media.poster_path
    : "https://www.flixdetective.com/web/images/poster-placeholder.png";

export class Media {
  constructor(data) {
    this.data = data;
  }

  populate() {
    const media = this.data;

    id("backdrop").style.background = `url(${urlDuBackdrop(
      media
    )}) center center`;

    id("poster").src = urlDuPoster(media);

    id("genre").innerText =
      media.genres && media.genres.length > 0
        ? media.genres[0].name
        : "";

    id(
      "votes"
    ).innerText = `${media.vote_average} (${media.vote_count})`;

    id("description").innerText = media.overview;
  }
}
