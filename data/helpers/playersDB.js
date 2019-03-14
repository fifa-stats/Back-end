const db = require("../dbconfig");

const fetchPlayers = async offset => {
  const players = await db("players")
    .select()
    .limit(50)
    .offset((offset - 1) * 50)
    .orderBy("id", "asc");

  return players;
};

const searchPlayersOrTeams = async searchTerm => {
  const players = await db("players")
    .select()
    .where(db.raw('LOWER("Name") like ?', `%${searchTerm}%`));

  const teams = await db("players")
    .select()
    .where(db.raw('LOWER("Club") like ?', `%${searchTerm}%`));

  result = { players, teams };

  return result;
};

module.exports = {
  fetchPlayers,
  searchPlayersOrTeams
};
