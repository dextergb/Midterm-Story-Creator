const express = require("express");
const router = express.Router();
const db = require("../db/database");

module.exports = () => {
  router.get("/:storyID", (req, res) => {
    let query = `SELECT * FROM stories`;
    //console.log(query);
    db.query(query)
      .then((data) => {
        const stories = data.rows;
        res.json({ stories });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // router.post("/:storyID", (req,res) => {
  //   db.query(`INSERT INTO contributed_stories
  //   (story_id, user_id, contributed_body, contributed_vote, accepted_contribution)
  //   VALUES
  //   ($1, $2, $3, $4, $5) RETURNING*`
  //   , [story_id, user_id, contributed_body, contributed_vote, accepted_contribution])
  //   .then((response) => {
  //     res.json(response.rows);
  //   })
  //   .catch((err) => {
  //     res.status(500).json({ error: err.message });
  //   });
  // })
  return router;
};
