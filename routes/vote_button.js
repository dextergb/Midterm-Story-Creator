const express = require("express");
const router = express.Router();
const db = require("../db/database");

module.exports = () => {
  router.post("/", (req, res) => {
    const story_id = req.body.param;
    console.log(story_id);

    db.query(
      "UPDATE stories SET votes = votes + 1 WHERE id = $1 RETURNING votes",
      [story_id]
    )
      .then((data) => {
        const voteCount = data.rows[0].votes;
        return res.status(200).send({ message: voteCount });
      })
      .catch((err) => {
        res.status(500).json(err);
        console.log(err);
      });
  });
  return router;
};
