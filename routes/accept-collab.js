const express = require("express");
const router = express.Router();
const db = require("../db/database");

module.exports = () => {
  router.get("/", (req, res) => {
    const user_id = req.session.user_id;
    db.query(
      `SELECT * FROM stories
    WHERE stories.user_id = $1
    AND stories.completed = false`,
      [user_id]
    )
      .then((response) => {
        const stories = response.rows;
        const templateVars = {
          stories: stories,
          userID: req.session.user_id,
        };

        db.query(`SELECT * FROM contributed_stories`).then((result) => {
          templateVars.contributions = result.rows;
          return res.render("collaborations.ejs", templateVars);
        });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/accepted", (req, res) => {
    const story_id = req.body.story_id;
    const contributed_id = req.body.contribute_id;
    db.query(
      `UPDATE contributed_stories
    SET accepted_contribution = true
    WHERE id = $1
    RETURNING contributed_body`,
      [contributed_id]
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
