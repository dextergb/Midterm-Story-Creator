const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../db/database");
const cookieSession = require("cookie-session");
const { Template } = require("ejs");
const authenticationOfUsers = require("../routes/helper_functions/helper_functions");

module.exports = () => {
  router.get("/", (req, res) => {
    const userCookie = req.session["user_id"];
    if (userCookie) {
      res.redirect("/");
    } else {
      const templateVars = {
        stories: response.rows,
        userID: req.session.user_id,
      };

      res.render("login.ejs", templateVars);
    }
  });
  router.post("/", (req, res) => {
    const email = req.body.email;
    const username = authenticationOfUsers(email, db);
    if (username) {
      req.session["user_id"] = user.id;
      res.redirect("/");
    } else {
      res.status(401).send("Please Try Again.");
    }
  });
  return router;
};
