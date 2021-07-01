const express = require("express");
const router = express.Router();
const db = require("../db/database");
const { response } = require("express");
const authenticationOfUsers = require("../routes/helper_functions/helper_functions");
module.exports = () => {
  router.get("/", (req, res) => {
    const user_id = req.session["user_id"];
    const user_email = req.session.email;
    const templateVars = {
      stories: response.rows,
      userID: req.session.user_id,
    };
    if (!user_id) {
      // if user is not logged , he will be redirected to the main page again
      return res.redirect("/login");
    }
    const user = authenticationOfUsers(user_email, db);

    if (user) {
      return res.render("stories_new.ejs", templateVars);
    } else {
      return res.redirect("/login");
    }
  });
  router.post("/new-story", (req, res) => {
    const body = req.body;
    const user_id = req.session.user_id;
    console.log(req.body);
    db.query(
      `INSERT INTO stories (user_id, story_body, title) VALUES ($1,$2,$3)`,
      [user_id, body.content, body.title]
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
