const express = require("express");
const router = express.Router();
const db = require("../db/database");

module.exports = () => {
  //Show the story
  router.get("/:storyID", (req, res) => {
    const story_id = req.params.storyID;
    db.query(
      `SELECT stories.*, users.nick_name, users.id
    FROM stories
    JOIN users ON stories.user_id = users.id
    WHERE stories.id = $1`,
      [story_id]
    )
      .then((data) => {
        const stories = data.rows[0];
        const templateVars = {
          stories: stories,
          userID: data.rows[0].user_id,
        };
        res.render("stories.ejs", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Contribute in the story. Get the page for contribution.
  router.get("/:storyID/contribute", (req, res) => {
    const story_id = req.params.storyID;
    const user_id = req.session.user_id;
    console.log("PARAMS", req.session);
    if (!user_id) {
      return res.redirect("/login");
    }
    db.query(
      `SELECT stories.*, users.nick_name, users.id
      FROM stories
      JOIN users ON stories.user_id = users.id
      WHERE stories.id = $1`,
      [story_id]
    )
      .then((data) => {
        const stories = data.rows[0];
        const templateVars = {
          stories: stories,
          storyID: story_id,
          userID: data.rows[0].user_id,
        };
        res.render("stories_collab", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Save the story contribution into the database
  router.post("/:storyID/contribute", (req, res) => {
    const story_id = req.params.storyID;
    const user_id = req.session.user_id;
    const contributed_body = req.body.text;

    db.query(
      `INSERT INTO contributed_stories
      (story_id, user_id, contributed_body)
      VALUES
      ($1, $2, $3) RETURNING*`,
      [story_id, user_id, contributed_body]
    )
      .then(() => {
        res.redirect(`contribute`);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //Count votes for stories
  router.post("/:storyID/increment", (req, res) => {
    let storyId = req.params.storyID;
    //update the value of votes column in the stories table to +1
    db.query(
      `UPDATE stories
      SET votes = votes + 1
      WHERE stories.id = $1;`,
      [storyId]
    )
      .then((data) => {
        res.render("index.ejs");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post("/complete", (req, res) => {
    const story_id = req.body.story_id;

    db.query(
      `UPDATE stories
      SET completed = true
      WHERE stories.id = $1;
    `,
      [story_id]
    )
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
