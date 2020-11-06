import Movie from "./data/Movie.js";
import Serie from "./data/Serie.js";
import { recupererParametre } from "./utils.js";

const traiterFilm = (data) => {
  const movie = new Movie(data);
  movie.populate();
};

const traiterSerie = (data) => {
  const serie = new Serie(data);
  serie.populate();
};

const chargerMedia = () => {
  const mediaType = recupererParametre("type");
  const id = recupererParametre("id");
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

window.addEventListener("load", chargerMedia);
