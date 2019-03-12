const db = require("../dbconfig");

const findTeams = async userId => {
  const teams = await db("teams")
    .select()
    .where("user_id", userId)
    .orderBy("name", "asc");

  return teams;
};

const createTeam = async (name, user_id) => {
  const team = await db("teams")
    .insert({ name: name, user_id: user_id })
    .returning(["id", "name"]);

  return team;
};

const deleteTeam = async id => {
  const deletedTeam = await db("teams")
    .del()
    .where("id", id);

  return deletedTeam;
};

module.exports = {
  findTeams,
  createTeam,
  deleteTeam
};
