const express = require("express");
const router = express.Router();
const db = require("../db/database");


// registration section

const findUserByEmail = (mail) => {
  db.query('SELECT * FROM users WHERE email = $1', [mail])
  .then((data) => {
    console.log("This coming====== ", data.rows[0]);
    return data.rows[0];
  })
};

//findUserByEmail("yahoo@yahoo.com");

module.exports = () => {
  router.get("/", (req, res) => {
    //res.send("Got it");
    res.render("register.ejs")
  });

  router.post("/", (req, res) => {
    const email = req.body.email;
    const fullName = req.body.full_name;
    //const nickName = req.body.nick_name;
    if (email === '' || fullName === '') {
      return res.status(400).send({message: 'Error: You need an Email and Full Name to Register'});
    }
    const body = req.body;
    const user = findUserByEmail(email);
    if (user) {
      return res.status(400).send({message: 'Error: This user exist'});
    }
    db.query(`INSERT INTO users (full_name, email, nick_name)
    VALUES (body.full_name, body.email, body.nick_name)`)
    .then(data => {
      console.log(" ++++++++ ", data.rows)
      const newUser = data.rows[0];
      console.log("This is a new user:", newUser);

      req.session["user_id"] = newUser.id;
      res.redirect("/main-page");
    })

    //res.cookie('user_id', userId);

  });
  return router;
};



