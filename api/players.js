const express = require("express");
const passport = require("passport");
const db = require("../data/helpers/playersDB");

const router = express.Router();

// @route GET api/players/
// @desc Get all players
// @access Public
router.get("/", async (req, res) => {
  try {
    const offset = req.query.page;
    const players = await db.fetchPlayers(offset);
    res.status(200).json(players);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to fetch players", error: error.message });
  }
});

// @route POST api/players/
// @desc Search players or teams
// @access Public
router.post("/", async (req, res) => {
  const searchTerm = req.body.searchTerm.toLowerCase();
  try {
    const response = await db.searchPlayersOrTeams(searchTerm);
    res.status(200).json(response);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to fetch players", error: error.message });
  }
});

module.exports = router;
