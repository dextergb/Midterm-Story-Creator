const {response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../db/database");

//

// to get the page of the story with specific id
module.exports = () => {
  router.get("/:storyID", (req, res) => {
    db.query(`
    SELECT * FROM stories
    JOIN users ON users.nick_name = user_name
    WHERE stories.id = $1
    `, [id])
    .then((response) => {
      res.json(response.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  })
  router.post("/:storyID", (req,res) => {
    db.query(`INSERT INTO contributed_stories
    (story_id, user_id, contributed_body, contributed_vote, accepted_contribution)
    VALUES
    ($1, $2, $3, $4, $5) RETURNING*`
    , [story_id, user_id, contributed_body, contributed_vote, accepted_contribution])
    .then((response) => {
      res.json(response.rows);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  })
}
