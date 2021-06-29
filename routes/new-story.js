const express = require("express");
const router = express.Router();
const db = require("../db/database");
module.exports = () => {
  router.get("/", (req, res) => {
    const userId = req.session["user_id"];
    const userEmail = req.session.email;

    if (!userId) {
      // if user is not logged , he will be redirected to the main page again
      return res.redirect("/login");
    }
    if (authenticationOfUsers(userId, userEmail, db) === true) {
      return res.render("stories_new.ejs");
    }
  });

  router.post("/", (req, res) => {
    const body = req.body;

    db.query(
      `INSET INTO stories (user_id, story_body, votes, completed, user_name) VALUES ($1,$2,$3,$4,$5)`,
      []
    );
  });

  return router;
};
