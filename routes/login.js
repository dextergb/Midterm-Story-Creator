const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../db/database");

module.exports = () => {
  router.get("/login", (req, res) => {
    const userCookies = db.query(
      `SELECT users.nick_name users.email FROM users
    WHERE users.email = $1 AND users.nick_name = = $2`,
      []
    );
  });
};
