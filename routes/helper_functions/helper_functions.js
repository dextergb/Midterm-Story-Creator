const db = require("../../db/database");

const authenticationOfUsers = async (email, db) => {
  const user = await db.query(
    `SELECT users.nick_name, users.email FROM users
    WHERE users.email = $1`,
    [email]
  );

  if (user) {
    return user;
  }
  return false;
};

module.exports = authenticationOfUsers;
