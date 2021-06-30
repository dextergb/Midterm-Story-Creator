const db = require("../../db/database");

const authenticationOfUsers = async (email, db) => {
<<<<<<< HEAD
  const user = await db
    .query(
      `SELECT users.nick_name, users.email FROM users
    WHERE users.email = $1`,
      [email]
    )
    .then((user) => {
      return user.rows[0];
    });

  if (user) {
    return user;
=======
  const result = await db.query(
    `SELECT users.nick_name, users.email FROM users
    WHERE users.email = $1`,
    [email]
  );
  if (result.rows.length > 0) {
    return rows[0];
>>>>>>> login
  }
  return false;
};

module.exports = authenticationOfUsers;
