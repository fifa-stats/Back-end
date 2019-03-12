const express = require("express");
const passport = require("passport");
const db = require("../data/helpers/playersDB");

const router = express.Router();

// @route GET api/players/
// @desc Get all players
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const players = await db.fetchPlayers();
      res.status(200).json(players);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to fetch players", error: error.message });
    }
  }
);

// @route GET api/players/default
// @desc Get all players
// @access Private
router.get(
  "/default",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const players = await db.fetchPlayersByTeamName(req.body.teamName);
      res.status(200).json(players);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to fetch players", error: error.message });
    }
  }
);

module.exports = router;
