const db = require("../dbconfig");

const findUser = async email => {
  const query = await db("users")
    .select("*")
    .where("email", email)
    .first();

  return query;
};

const signup = async user => {
  const query = await db("users")
    .insert(user)
    .returning("fname", "lname");

  return query;
};

module.exports = {
  findUser,
  signup
};
