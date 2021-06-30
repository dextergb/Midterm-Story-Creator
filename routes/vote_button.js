const express = require("express");
const router = express.Router();
const db = require("../db/database");

module.exports = () => {
  router.post("/", (req, res) => {
    const story_id = req.body.param;
    console.log(story_id);
    db.query("SELECT votes FROM stories WHERE id = $1", [story_id]).then(
      (data) => {
        const voteCount = data.rows[0].votes + 1;
        db.query("UPDATE stories SET votes =  $1 WHERE id = $2", [
          voteCount,
          story_id,
        ])
          .then((data) => {
            console.log(voteCount);
            return res.status(200).send({ message: voteCount });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    );
  });
  return router;
};
