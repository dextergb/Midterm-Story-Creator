const express = require("express");
const router = express.Router();
const db = require("../db/database");
const authenticationOfUsers = require("./helper_functions/helper_functions");
const { response } = require("express");

module.exports = () => {
  router.get("/", (req, res) => {
    const user_id = req.session.user_id;
    db.query(
      `SELECT * FROM stories
    JOIN contributed_stories ON stories.id = contributed_stories.story_id
    WHERE stories.user_id = $1
    AND stories.completed = false
    AND contributed_stories.accepted_contribution = false`,
      [user_id]
    )
      .then((response) => {
        const stories = response.rows[0];
        console.log(
          "🚀 ~ file: accept-collab.js ~ line 20 ~ .then ~ data.rows[0]",
          response.rows[0]
        );
        const templateVars = {
          stories: stories,
          userID: req.session.user_id,
        };
        res.json(stories, templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const story_id = req.params.storyID;
    const contributed_stories_id = req.params.contributed_body;

    db.query(
      `UPDATE contributed_stories
    SET accepted_contribution = true
    WHERE id = $1
    RETURNING contributed_body`,
      [contributed_stories_id]
    )

      .then((res) => {
        const contributed_body = res.rows[0].contributed_body;
        return db.query(
          `UPDATE stories
    SET story_body = story_body || E'\n\n' || $1
    WHERE id = $2
    `,
          [contributed_body, story_id]
        );
      })
      .then(() => {
        res.redirect("/");
      });
  });
  return router;
};
