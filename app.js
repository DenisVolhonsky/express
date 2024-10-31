const express = require("express");
const fs = require("fs/promises");
const moment = require("moment");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

const booksRouter = require("./routes/api/books");

// web server
const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger)); // for terminal

// cors middleware
app.use(cors()); // allow cross domain request
app.use(express.json());

// logs middleware
app.use(async (req, res, next) => {
  const { method, url } = req;
  const date = moment().format("YYYY-MM-DD_hh:mm:ss");
  await fs.appendFile("./public/server.log", `\n${method} ${url} ${date}`);
  next();
});

app.use("/api/books", booksRouter);

// error route middleware
app.use((req, res) => {
  res.status(404).json({
    message: "Not found",
  });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Not found" } = err;
  res.status(status).json({
    message,
  });
});

module.exports = app;
