const { default: axios } = require("axios");

function getLyrics() {
  let trackName = "Shape of You",
    artistName = "Ed Sheeran";
  axios(`https://api.lyrics.ovh/v1/${artistName}/${trackName}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
