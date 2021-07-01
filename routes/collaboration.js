// const express = require("express");
// const router = express.Router();
// const db = require("../db/database");
// const { response } = require("express");
// const authenticationOfUsers = require("../routes/helper_functions/helper_functions");
// module.exports = () => {
//   router.get("/", (req, res) => {
//     const userId = req.session["user_id"];
//     const userEmail = req.session.email;
//     const templateVars = {
//       stories: response.rows,
//       userID: req.session.user_id,
//     };
//     if (!userId) {
//       // if user is not logged , he will be redirected to the main page again
//       return res.redirect("/login");
//     }
//     const user = authenticationOfUsers(userEmail, db);

//     if (user) {
//       return res.render("collaborations.ejs", templateVars);
//     } else {
//       return res.redirect("/login");
//     }
//   });

//   return router;
// };

const { Template } = require("ejs");
const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../db/database");

module.exports = () => {
  router.get("/", (req, res) => {
    db.query(
      `SELECT stories.id, stories.story_body, stories.user_id, votes, completed, users.nick_name FROM stories
      INNER JOIN users ON stories.user_id = users.id
    `
    )
      .then((response) => {
        const templateVars = {
          stories: response.rows,
          userID: req.session.user_id,
        };

        res.render("collaborations.ejs", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  return router;
};
