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
      res.status(400).json({ error: "Failed to fetch teams" });
    }
  }
);

// @route GET api/teams/default
// @desc Get all default teams
// @access Private
router.get("/default", async (req, res) => {
  try {
    const teams = await db.findDefaultTeams();
    res.status(200).json(teams);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch teams" });
  }
});

// @route GET api/teams/:team_id
// @desc Get all players from a team
// @access Private
router.get(
  "/:team_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      //Find teams owned by current user
      const teams = await db.findTeams(req.user.id);
      const ids = teams.map(team => team.id);

      if (!ids.includes(Number(req.params.team_id))) {
        return res.status(400).json({ message: "Team not found" });
      }

      const players = await db.getPlayersByTeam(req.params.team_id);
      res.status(200).json(players);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to fetch players", error: error.message });
    }
  }
);

// @route POST api/teams/
// @desc Create new team for current user
// @access Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      //Check if team already exists
      const teams = await db.findTeams(req.user.id);
      const teamNames = teams.map(team => team.name);
      if (teamNames.includes(req.body.name.toLowerCase())) {
        return res.status(400).json({
          message: "Team already exists",
          error: "Duplicate team name"
        });
      }

      const newTeam = await db.createTeam(
        req.body.name.toLowerCase(),
        req.user.id
      );
      res.status(201).json(newTeam[0]);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to create team", error: error.message });
    }
  }
);

// @route POST api/teams/:id/add
// @desc Add player to team
// @access Private
router.post(
  "/:team_id/add",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const player = {
        team_id: req.params.team_id,
        player_id: req.body.player_id
      };
      const response = await db.addPlayer(player);
      res.status(200).json({ message: "Player added successfully" });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to add player", error: error.message });
    }
  }
);

// @route DELETE api/teams/:id
// @desc Delete team
// @access Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const response = await db.deleteTeam(req.params.id);
      res.status(200).json({ message: "Team deleted successfully" });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to delete team", error: error.message });
    }
  }
);

// @route DELETE api/teams/:id/delete/:id
// @desc Delete team
// @access Private
router.delete(
  "/:id/delete/:player_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const response = await db.deletePlayer(
        req.params.id,
        req.params.player_id
      );
      res.status(200).json({ message: "Player deleted successfully" });
    } catch (error) {
      res
        .status(400)
        .json({ message: "Failed to delete team", error: error.message });
    }
  }
);

module.exports = router;
