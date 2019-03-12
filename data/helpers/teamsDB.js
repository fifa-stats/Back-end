const db = require("../dbconfig");

const findTeams = async userId => {
  const teams = await db("teams")
    .select()
    .where("user_id", userId)
    .orderBy("name", "asc");

  return teams;
};

module.exports = {
  findTeams
};
