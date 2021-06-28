const express = require("express");
const router = express.Router();
const db = require("../db/database");
app.set("view engine", "ejs");
module.exports = () => {
  router.get("/", (req, res) => {
    res.render("index");
  });

  return router;
};
