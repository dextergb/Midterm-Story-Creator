const express = require("express");
const router = express.Router();
const db = require("../db/database");
const authenticationOfUsers = require("./helper_functions/helper_functions");
const { response } = require("express");

module.exports = () => {
  router.get("/:storyID", (req, res) => {
    const storyId = req.params.storyID;
    db.query(
      `SELECT stories.*, users.nick_name, users.id
    FROM stories
    JOIN users ON stories.user_id = users.id
    WHERE stories.id = $1`,
      [storyId]
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

  router.get("/:storyID/contribute", (req, res) => {
    // const stories = data.rows[0];
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
          storyID: story_id,
          userID: data.rows[0].user_id,
        };

        res.render("stories_collab", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

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



  // To get story completed and redirect to the main page
  router.post("/:storyID/complete", (req, res) => {
    const userId = req.session["user_id"];
    const userEmail = req.session.email;
    ;

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
          const templateVars = {
            stories: response.rows,
            userID: req.session.user_id,
            stories,
          };
          const stories = data.rows[0]["story_body"];
          //const stories = data.rows[0]["story_body"];
          res.render("index.ejs", templateVars);
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });

  // count votes for all stories
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

// db.query(
//   `SELECT stories.*, contributed_stories.contributed_body, users.nick_name
// FROM stories
// JOIN users ON stories.user_id = users.id
// JOIN contributed_stories ON stories.id = contributed_stories.story_id
// WHERE stories.id = $1`,
//   [storyId]
// )
