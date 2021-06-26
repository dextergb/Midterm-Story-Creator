const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../db/database");

module.exports = () => {
  router.get("/main", (req, res) => {
    db.query(`SELECT * FROM users`).then((response) => {
      res.json(response.rows);
    });
  });
  return router;
};
