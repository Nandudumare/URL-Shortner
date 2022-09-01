const express = require("express");
const connection = require("./config/db");
const urlModel = require("./models/url");
const cors = require("cors");
const { generate, redirect } = require("./controllers/url");
require("dotenv").config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*" }));

//url generating
app.post("/api/url", generate);

//redirecting
app.get("/:str", redirect);

//checking
app.get("/", (req, res) => {
  res.send("Hello world!");
});

//connecting
const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Server has been started");
  } catch {
    console.log("Server not Started");
  }
});
