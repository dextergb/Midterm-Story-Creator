const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../db/database");

module.exports = () => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT stories.story_body, stories.user_id, votes, completed, users.nick_name FROM stories
      INNER JOIN users ON stories.user_id = users.id
    `
    )
      .then((response) => {
        console.log(response.rows);
        const stories = JSON.stringify(response.rows);
        res.render("index.ejs");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
