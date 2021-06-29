const { Template } = require("ejs");
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
        const templateVars = {
          stories: response.rows,
        };
        console.log(response.rows);

        res.render("index.ejs", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
