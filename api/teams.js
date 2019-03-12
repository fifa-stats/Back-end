const express = require("express");
const passport = require("passport");
const db = require("../data/helpers/teamsDB");

const router = express.Router();

// @route GET api/teams/
// @desc Get all teams of current user
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = req.user.id;
      const teams = await db.findTeams(userId);
      res.status(200).json(teams);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;