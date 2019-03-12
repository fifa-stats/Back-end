const db = require("../dbconfig");
const knex = require("knex");

const fetchPlayers = async () => {
  const players = await db("players")
    .select()
    .orderBy("id", "asc");

  return players;
};

const fetchPlayersByTeamName = async clubName => {
  const players = await db("players")
    .select()
    .where(knex.raw('LOWER("Club") = ?', clubName));

  return players;
};

module.exports = {
  fetchPlayers,
  fetchPlayersByTeamName
};
