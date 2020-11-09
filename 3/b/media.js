import { Movie } from "./classes/Movie.js";
import { Serie } from "./classes/Serie.js";
import { id } from "./utils.js";

const traiterFilm = (data) => {
  const film = new Movie(data);
  film.populate();
};

const traiterSerie = (data) => {
  const serie = new Serie(data);
  serie.populate();
};

const chargerMedia = (mediaType, id) => {
  if (id.length === 0 || mediaType.length === 0) {
    alert("Il y a un souci dans l'URL !");
  } else {
    const tmdbUrl = `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=97719463bea4bd4b5902c1a735c0556a&language=fr-FR`;
    axios
      .get(tmdbUrl)
      .then((result) =>
        mediaType == "movie"
          ? traiterFilm(result.data)
          : traiterSerie(result.data)
      );
  }
};

export const initMedia = (mediaType, mediaId) => {
  id("recherche").classList.add("hidden");
  id("media").classList.remove("hidden");
  chargerMedia(mediaType, mediaId);
};
