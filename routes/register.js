const express = require("express");
const router = express.Router();
const db = require("../db/database");
const { response } = require("express");
const authenticationOfUsers = require("./helper_functions/helper_functions");
// registration section

//findUserByEmail("yahoo@yahoo.com");

module.exports = () => {
  router.get("/", (req, res) => {
    const templateVars = {
      stories: response.rows,
      userID: req.session.user_id,
    };
    //res.send("Got it");
    res.render("register.ejs", templateVars);
  });

  router.post("/", async (req, res) => {
    const email = req.body.email;
    const fullName = req.body.full_name;
    // console.log("MYBODY LIES", req.body);
    //const nickName = req.body.nick_name;
    if (email === "" || fullName === "") {
      return res.status(400).send({
        message: "Error: You need an Email and Full Name to Register",
      });
    }
    if (await authenticationOfUsers(email, db)) {
      return res.status(400).redirect("/register?error=Userinuse");
    }
    const body = req.body;

    db.query(
      `INSERT INTO users (full_name, email, nick_name)
      VALUES ($1,$2,$3) RETURNING *`,
      [body.full_name, body.email, body.nick_name]
    ).then((data) => {
      // console.log(" ++++++++ ", data.rows);
      const newUser = data.rows[0];
      console.log("This is a new user:", newUser);

      req.session["user_id"] = newUser.id;
      res.redirect("/");
    });

    //res.cookie('user_id', userId);
  });
  return router;
};
