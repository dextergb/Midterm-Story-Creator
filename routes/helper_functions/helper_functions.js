const db = require("../../db/database");

const authenticationOfUsers = async (email, db) => {
  const result = await db.query(
    `SELECT users.id, users.nick_name, users.email FROM users
    WHERE users.email = $1`,
    [email]
  );
  if (result.rows.length > 0) {
    return result.rows[0];
  }
  return false;
};

module.exports = authenticationOfUsers;
