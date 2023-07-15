// api.js
const express = require("express");
const app = express();
const axios = require("axios");
class Api {
  constructor(app) {
    this.app = app;
    this.baseurl = "/api/v1/";
    this.routes = [
      {
        path: "search",
        method: "GET",
        handler: this.handleSearchRequest,
      },
      {
        path: "search/:search",
        method: "GET",
        handler: this.handleSearchRequest,
        response: {},
      },
    ];
  }

  start() {
    console.log("Api Started");
    this.routes.forEach(({ path, method, handler }) => {
      this.app[method.toLowerCase()](this.baseurl + path, handler);
    });

    this.app.all(this.baseurl + "*", this.handleRequest);
  }

  // ...

  async handleSearchRequest(req, res) {
    let { search } = req.params;
    let query = req.query.q;

    if (search) {
      query = search;
    } else {
      search = query;
    }

    try {
      const response = await axios.get("https://itunes.apple.com/search", {
        params: {
          term: query,
          media: "music",
          limit: 50,
        },
      });

      const songs = response.data.results.map((song) => {
        return {
          trackId: song.trackId,
          trackName: song.trackName,
          artistName: song.artistName,
          previewUrl: song.previewUrl,
          artworkUrl100: song.artworkUrl100,
          collectionName: song.collectionName,
        };
      });

      res.json(songs);
    } catch (error) {
      console.error("Error searching for songs:", error.message);
      res.status(500).json({ error: "Failed to search for songs" });
    }
  }

  handleRequest(req, res) {
    // Handle other requests here
    res.status(404).json({ status: "error", message: "Route not found" });
  }
}

module.exports = { Api };
