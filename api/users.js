const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require("../data/helpers/usersDB");

const router = express.Router();
dotenv.config();

//import validators
const validateLoginInput = require("../validation/login");
const validateSignupInput = require("../validation/signup");

//Generate json web token
const jwtKey = process.env.SECRET;

function generateToken(user) {
  const username = user.fname + " " + user.lname;
  const payload = {
    id: user.id,
    username,
    email: user.email
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, jwtKey, options);
}

// @route POST api/users/login
// @desc Log user in
// @access Public
router.post("/login", async (req, res) => {
  //Validate input
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Get user from db
  const user = await db.findUser(req.body.email);
  //Return error if cannot find user
  if (!user) {
    return res.status(400).json({ error: "User does not exists" });
  }

  //Check if password matches
  const match = bcrypt.compareSync(req.body.password, user.password);
  if (match) {
    //If match generate a json web token and send back to client
    const token = "Bearer " + generateToken(user);
    res.status(200).json(token);
  } else {
    //If not return error
    res.status(400).json({ error: "Failed to login" });
  }
});

// @route POST api/users/signup
// @desc Sign new user in
// @access Public
router.post("/signup", async (req, res) => {
  //Validate input
  const { errors, isValid } = validateSignupInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newUser = req.body;

  try {
    //Check if user already exists
    const existingUser = await db.findUser(newUser.email);

    //Return error if user already exists
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    //hash password using bcrypt
    const hash = bcrypt.hashSync(newUser.password, 12);
    newUser.password = hash;

    // Create new user
    const response = await db.signup(newUser);

    //Create a json web token with username and send back to client
    const token = "Bearer " + generateToken(response[0]);

    res.status(201).json(token);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
