import { id } from "../utils.js";

const urlDuBackdrop = (media) =>
  media.backdrop_path
    ? "https://image.tmdb.org/t/p/w1280" + media.backdrop_path
    : "https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png";

export const urlDuPoster = (media) =>
  media.poster_path
    ? "https://image.tmdb.org/t/p/w154" + media.poster_path
    : "https://www.flixdetective.com/web/images/poster-placeholder.png";

export class Media {
  constructor(data) {
    this.data = data;
  }

  handleSimilar(data, mediaType) {
    id("similaires").innerText = "";
    data.results.forEach((media) => {
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.innerText =
        mediaType === "movie" ? media.title : media.name;
      link.href = `#${mediaType}/${media.id}`;
      li.appendChild(link);
      id("similaires").appendChild(li);
    });
  }

  populateSimilar(mediaType) {
    id("similairesType").innerText =
      mediaType === "movie" ? "Films" : "Séries";

    const tmdbUrl = `https://api.themoviedb.org/3/${mediaType}/${this.data.id}/similar?api_key=97719463bea4bd4b5902c1a735c0556a&language=fr-FR`;
    axios
      .get(tmdbUrl)
      .then((result) => this.handleSimilar(result.data, mediaType));
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
