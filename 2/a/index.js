import { Movie } from "./classes/Movie.js";
import { Serie } from "./classes/Serie.js";

const recupererParametre = (nomParam) => {
  const keyValues = document.location.search
    .replace("?", "")
    .split("&");
  for (let i = 0; i < keyValues.length; i++) {
    const keyValue = keyValues[i].split("=");
    if (keyValue[0] == nomParam) {
      return keyValue[1];
    }
  }
  return "";
};

const traiterFilm = (data) => {
  const film = new Movie(data);
  film.populate();
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
