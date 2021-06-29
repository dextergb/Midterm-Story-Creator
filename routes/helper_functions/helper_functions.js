const db = require("../../db/database");

const authenticationOfUsers = (username, email, db) => {
  const user = db.query(
    `SELECT users.nick_name users.email FROM users
    WHERE users.email = $1 AND users.nick_name = = $2`,
    [username, email]
  );

  if (user) {
    return user;
  }
  return false;
};

module.exports = authenticationOfUsers;
