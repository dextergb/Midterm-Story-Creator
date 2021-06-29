const express = require("express");
const router = express.Router();
const db = require("../db/database");
const authenticationOfUsers = require("./helper_functions/helper_functions");

module.exports = () => {
  router.get("/:storyID", (req, res) => {
    const storyId = req.params.storyID;
    const storyBody = req.params.story_body;
    //console.log(storyId);
    //console.log(query);
    db.query(
      `SELECT stories.*, users.nick_name
    FROM stories
    JOIN users ON stories.user_id = users.id
    WHERE stories.id = $1`,
      [storyId]
    )
      .then((data) => {
        console.log(data.rows[0]);
        const stories = data.rows[0]["story_body"];
        res.json({ stories });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // GET for contribute
  router.get("/:storyID/contribute", (req, res) => {
    //res.send("Got it");
    res.render("stories_collab.ejs");
  });
  // POST for contribute
  router.post("/:storyID/contribute", (req, res) => {
    db.query(
      `INSERT INTO contributed_stories
    (story_id, user_id, contributed_body, contributed_vote, accepted_contribution)
    VALUES
    ($1, $2, $3, $4, $5) RETURNING*`,
      [
        story_id,
        user_id,
        contributed_body,
        contributed_vote,
        accepted_contribution,
      ]
    )
      .then((response) => {
        res.json(response.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  // should be for user, not for all
  router.get("/:storyID/complete", (req, res) => {
    const userId = req.session["user_id"];

    if (!userId) {
      // if user is not logged , he will be redirected to the main page again
      return res.redirect("/login");
    }
    res.render("stories.ejs");
  });

  // To get story completed and redirect to the main page
  router.post("/:storyID/complete", (req, res) => {
    const userId = req.session["user_id"];
    const userEmail = req.session.email;
    const storyId = req.session.story_id;

    if (!userId) {
      // if user is not logged , he will be redirected to the main page again
      return res.redirect("/login");
    }
    if (authenticationOfUsers(userEmail, db) === true) {
      db.query(
        `UPDATE stories
      SET completed = true
      WHERE story_id = $1;`,
        [storyId]
      )
        .then((data) => {
          console.log(data.rows[0]);
          //const stories = data.rows[0]["story_body"];
          res.render("index.ejs");
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });

  return router;
};

// to complete the story
/*
UPDATE stories
SET completed = true
WHERE story_id = $1;
*/
