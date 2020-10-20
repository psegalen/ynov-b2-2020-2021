const axios = require("axios");

const printDuration = (duration) => `${Math.floor(duration / 60)}mn${duration % 60}`;

const printData = (data) => {
    const filteredData = data.filter(result => result.type === "track");
    for (let i = 0; i < filteredData.length; i++) {
        const { title, artist, album, duration } = filteredData[i];
        console.log(`Title: ${title} / Artist: ${artist.name}  / Album: ${album.title} / Duration: ${printDuration(duration)}`);
    }
}

const fetchAPI = (searchTerm) => {
    const finalUrl = "https://api.deezer.com/search?q=" + 
        encodeURIComponent(searchTerm);
    axios.get(finalUrl)
        .then(response => printData(response.data.data));
};

fetchAPI("daft punk");
