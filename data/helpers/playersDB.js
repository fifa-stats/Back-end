const db = require("../dbconfig");

const fetchPlayers = async () => {
  const players = await db("players")
    .select()
    .orderBy("id", "asc");

  return players;
};

module.exports = {
  fetchPlayers
};
