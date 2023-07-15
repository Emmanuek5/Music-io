const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
const { Api } = require("./src/api/class");
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use("/favicon.ico", express.static("src/public/favicon.ico"));
app.use(express.static(path.join(__dirname, "./src/public")));
// Logging middleware
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(
      `Request: ${req.method} ${req.url} - ${res.statusCode} - ${req.ip}`
    );
  });
  next();
});

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

module.exports = { app };
const api = new Api(app).start();

module.exports = { api };
