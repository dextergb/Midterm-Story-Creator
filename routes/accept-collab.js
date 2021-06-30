const express = require("express");
const router = express.Router();
const db = require("../db/database");
const authenticationOfUsers = require("./helper_functions/helper_functions");
const { response } = require("express");

module.exports = () => {
  router.get("/", (req, res) => {
    db.query("SELECT story_body");
  });
};
