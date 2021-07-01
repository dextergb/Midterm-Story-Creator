const express = require("express");
const router = express.Router();
const db = require("../db/database");

module.exports = () => {
  //Show the story
  router.get("/:storyID", (req, res) => {
<<<<<<< HEAD
    const storyId = req.params.storyID;

    db.query(
      `SELECT stories.*, users.nick_name, users.id
      FROM stories
      JOIN users ON stories.user_id = users.id
      WHERE stories.id = $1`,
      [storyId]
=======
    const story_id = req.params.storyID;
    db.query(
      `SELECT stories.*, users.nick_name, users.id
    FROM stories
    JOIN users ON stories.user_id = users.id
    WHERE stories.id = $1`,
      [story_id]
>>>>>>> a38f3fff7dabb76a28654d6783a1ba88ec4c14be
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
<<<<<<< HEAD

=======
    const user_id = req.session.user_id;
    console.log("PARAMS", req.session);
    if (!user_id) {
      // if user is not logged , he will be redirected to the main page again
      return res.redirect("/login");
    }
>>>>>>> a38f3fff7dabb76a28654d6783a1ba88ec4c14be
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

  //Set the story completed and redirect to the main page
  router.post("/:storyID/complete", (req, res) => {
    const userId = req.session["user_id"];
    const userEmail = req.session.email;

    const story_id = req.params.storyID;
    if (!userId) {
      // if user is not logged , he will be redirected to the main page again
      return res.redirect("/login");
    }
    if (authenticationOfUsers(userEmail, db) === true) {
      db.query(
        `UPDATE stories
      SET completed = true
      WHERE story_id = $1;`,
        [story_id]
      )
        .then((data) => {
          const stories = data.rows[0];
          const templateVars = {
            stories: response.rows,
            userID: req.session.user_id,
            stories,
          };

          res.render("index.ejs", templateVars);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
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
  return router;
};
