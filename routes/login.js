const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../db/database");
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
  router.post("/", async (req, res) => {
    const email = req.body.email;
    const user = await authenticationOfUsers(email, db);
    if (user) {
      req.session["user_id"] = user.id;
      req.session.email = user.email;
      res.redirect("/");
    } else {
      res.status(401).send("User Does Not Exist");
    }
  });
  return router;
};
