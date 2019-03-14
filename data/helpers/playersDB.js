const db = require("../dbconfig");

const fetchPlayers = async offset => {
  const players = await db("players")
    .select()
    .limit(50)
    .offset((offset - 1) * 50)
    .orderBy("id", "asc");

  return players;
};

module.exports = {
  fetchPlayers
};
