const express = require("express");
const fs = require("fs/promises");
const moment = require("moment");
const cors = require("cors");
const books = require("./books");

// web server
const app = express();

// cors middleware
app.use(cors()); // allow cross domain request

// logs middleware 
app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format("YYYY-MM-DD_hh:mm:ss");
  await fs.appendFile("./public/server.log", `\n${method} ${url} ${date}`);
  next();
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/products", (req, res) => {
  res.json([]);
});

// error route middleware
app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.listen(3001);
