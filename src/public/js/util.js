// JavaScript
const form = document.querySelector("form");
const songdiv = document.getElementById("song_div");

// ... (other parts of the code)

// ... (other parts of the code)

function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("search-input").value;

  const apiUrl = `/api/v1/search/${name}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Clear previous search results
      songdiv.innerHTML = "";

      if (data.error) {
        songdiv.innerHTML = `
            <h2>No results found</h2>
            <p>Try searching for a song or artist.</p>
            <div>
                <a href="https://open.spotify.com" class="spotify-button">
                    <i class="fab fa-spotify"></i> Listen on Spotify
                </a>
                <a href="https://music.apple.com/" class="apple-music-button">
                    <i class="fab fa-apple"></i> Listen on Apple Music
                </a>
            </div>
        `;
      }
      if (data.length === 0) {
        songdiv.innerHTML = `
    <h2>No results found</h2>
    <p>Try searching for a song or artist.</p>
    <div>
      <a href="#" class="spotify-button">
        <i class="fab fa-spotify"></i> Listen on Spotify
      </a>
      <a href="#" class="apple-music-button">
        <i class="fab fa-apple"></i> Listen on Apple Music
      </a>
    </div>
  `;
      }

      data.forEach((song) => {
        // Extract song information from the API response
        const songName = song.trackName;
        const artistName = song.artistName;
        const albumName = song.collectionName;
        const coverUrl = song.artworkUrl100;
        const previewUrl = song.previewUrl;

        // Create custom HTML elements for each song
        const songElement = document.createElement("div");
        songElement.classList.add("song");

        const songImage = document.createElement("img");
        songImage.src = coverUrl;
        songImage.alt = `${songName} Cover`;
        songElement.appendChild(songImage);

        const songDetails = document.createElement("div");
        songDetails.classList.add("song-details");

        const songTitle = document.createElement("h2");
        songTitle.textContent = songName;
        songDetails.appendChild(songTitle);

        const songArtist = document.createElement("p");
        songArtist.textContent = `Artist: ${artistName}`;
        songDetails.appendChild(songArtist);

        const songAlbum = document.createElement("p");
        songAlbum.textContent = `Album: ${albumName}`;
        songDetails.appendChild(songAlbum);
        const audioPlayer = document.createElement("audio");
        audioPlayer.src = previewUrl;
        audioPlayer.controls = true;
        songDetails.appendChild(audioPlayer);

        // Append the song element to the songdiv
        songElement.appendChild(songDetails);
        songdiv.appendChild(songElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      songdiv.innerHTML =
        '<p class="error-message">An error occurred while fetching data. Please try again later.</p>';
    });
}

form.addEventListener("submit", handleSubmit);
