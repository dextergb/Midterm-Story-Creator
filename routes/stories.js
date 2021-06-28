const express = require("express");
const router = express.Router();
const db = require("../db/database");

module.exports = () => {
  router.get("/:storyID", (req, res) => {
    const storyId = req.params.storyID;
    const storyBody = req.params.story_body;
    //console.log(storyId);
    //console.log(query);
    db.query(`SELECT stories.*, users.nick_name
    FROM stories
    JOIN users ON stories.user_id = users.id
    WHERE stories.id = $1`, [storyId])
      .then((data) => {
        console.log(data.rows[0]);
        const stories = data.rows[0]["story_body"];
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

  router.get("/", (req, res) => {
    console.log("This is for all stories");
    //console.log(query);
    db.query(`SELECT stories.* FROM stories`)
      .then((data) => {
        console.log(data);
        // needs to figure out what we need here
        const stories = data.rows[0]["story_body"];
        res.json({ stories });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
