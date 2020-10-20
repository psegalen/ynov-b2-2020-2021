const axios = require("axios");

// Following function converts seconds in time "XX mn XX"
const formatDuration = (duration) =>
  `${Math.floor(duration / 60)} mn ${`${duration % 60}`.padStart(2, "0")}`;

const printTracks = (tracks) => {
  tracks.forEach((track) => {
    const { title, artist, album, duration } = track;
    console.log(
      `${title} / ${artist.name} / ${album.title} / ${formatDuration(
        duration
      )}`
    );
  });
};

const fetchTracks = (searchTerm) => {
  axios
    .get(`https://api.deezer.com/search?q=${encodeURIComponent(searchTerm)}`)
    .then((response) => printTracks(response.data.data));
};

fetchTracks(process.argv[2]);
