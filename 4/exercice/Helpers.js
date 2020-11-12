const Helpers = {
  getParam: name => {
    const params = new URLSearchParams(document.location.search);
    return params.get(name);
  },
  id: id => document.getElementById(id),
  remplirChamp: (id, text) => {
    document.getElementById(id).innerText = text;
  },
  backdropUrl: suffix =>
    suffix
      ? `https://image.tmdb.org/t/p/w1280${suffix}`
      : "https://betravingknows.com/wp-content/uploads/2017/06/video-movie-placeholder-image-grey.png",
  posterUrl: suffix =>
    suffix
      ? `https://image.tmdb.org/t/p/w154${suffix}`
      : "https://www.flixdetective.com/web/images/poster-placeholder.png",
  imageUrl: suffix => `https://image.tmdb.org/t/p/w300${suffix}`
};

export default Helpers;
