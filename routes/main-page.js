const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../db/database");

module.exports = () => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT story_body, user_id, votes, completed FROM stories
    `
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
