const db = require("../dbconfig");

const findTeams = async userId => {
  const teams = await db("teams")
    .select()
    .where("user_id", userId)
    .orderBy("name", "asc");

  return teams;
};

const findDefaultTeams = async () => {
  const teams = await db("players")
    .distinct("Club")
    .select();

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

const getPlayersByTeam = async team_id => {
  const players = await db("players")
    .select("players.*")
    .innerJoin("custom_team", "players.id", "custom_team.player_id")
    .where("custom_team.team_id", team_id);

  return players;
};

const getPlayersByDefaultTeam = async team_name => {
  const players = await db("players")
    .select("id")
    .where(db.raw('LOWER("Club") = ?', team_name));

  return players;
};

const addPlayer = async player => {
  const query = await db("custom_team").insert(player);
  return 1;
};

const deletePlayer = async (team_id, player_id) => {
  const query = await db("custom_team")
    .del()
    .where({ team_id: team_id, player_id: player_id });

  return 1;
};

module.exports = {
  findTeams,
  findDefaultTeams,
  createTeam,
  deleteTeam,
  getPlayersByTeam,
  getPlayersByDefaultTeam,
  addPlayer,
  deletePlayer
};
