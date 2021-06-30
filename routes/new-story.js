const express = require("express");
const router = express.Router();
const db = require("../db/database");
const { response } = require("express");
const authenticationOfUsers = require("../routes/helper_functions/helper_functions");
module.exports = () => {
  router.get("/", (req, res) => {
    // console.log("++_+_+_+_+_+_+---");
    const userId = req.session["user_id"];
    const userEmail = req.session.email;
    const templateVars = {
      stories: response.rows,
      userID: req.session.user_id,
    };
    if (!userId) {
      // if user is not logged , he will be redirected to the main page again
      return res.redirect("/login");
    }
    const user = authenticationOfUsers(userEmail, db);

    if (user) {
      return res.render("stories_new.ejs", templateVars);
    } else {
      return res.redirect("/login");
    }
  });
  router.post("/", (req, res) => {
    const body = req.body;

    db.query(
      `INSERT INTO stories (user_id, story_body, user_name) VALUES ($1,$2,$3)`,
      [body.user_id, body.story_body, body.user_name]
    );
  });

  return router;
};
