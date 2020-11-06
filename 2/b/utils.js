export const formaterDuree = (duree) => {
  if (duree) {
    const nbHeures = Math.floor(duree / 60);
    const nbMinutes = duree % 60;
    return nbHeures + " h " + nbMinutes;
  } else {
    return "inconnue";
  }
};

export const formaterMontant = (montant) => {
  const montantEnEuros = Math.round(montant / 1.1);
  if (montantEnEuros > 1000000)
    return (montantEnEuros / 1000000).toFixed(1) + " M€";
  else if (montantEnEuros > 1000)
    return (montantEnEuros / 1000).toFixed(1) + " K€";
  else return montantEnEuros + " €";
};

export const urlDuBackdrop = (media) =>
  media.backdrop_path
    ? "https://image.tmdb.org/t/p/w1280" + media.backdrop_path
    : "https://lh3.googleusercontent.com/proxy/dZsw-A4QmKEUGDv_rj_y7HtwTaTSM1HjhgZHogrb-HQAjF6VYY8YhLVRjZvFXvh3zvNRSiSDU0edc-HQYVzQ0LKSqfnD9eYzbHB12tow0O7IFk8w3n9YFSskLFTYhfaXmKRM";

export const urlDuPoster = (media) =>
  media.poster_path
    ? "https://image.tmdb.org/t/p/w154" + media.poster_path
    : "https://www.flixdetective.com/web/images/poster-placeholder.png";

export const recupererParametre = (nomParam) => {
  // Spoiler : en modifiant légèrement cette fonction, elle pourrait aussi servir à récupérer le type de média
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

export const id = (id) => document.getElementById(id);
