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

const selectPage = () => {
  const hash = document.location.hash.replace("#", "");
  const path = hash.split("/");
  switch (path[0]) {
    case "movie":
    case "tv":
      id("recherche").style.display = "none";
      id("media").style.display = "";
      chargerMedia(path[0], path[1]);
      break;
    default:
      id("recherche").style.display = "";
      id("media").style.display = "none";
      break;
  }
};

window.addEventListener("load", selectPage);
window.addEventListener("hashchange", selectPage);
