const express = require("express");
const router = express.Router();

//import validators
const validateLoginInput = require("../validation/login");
const validateSignupInput = require("../validation/signup");

let id = 2;

const db = {
  users: [
    {
      id: "1",
      fname: "Vu",
      lname: "Cao",
      email: "vcao@gmail.com",
      password: "123456"
    }
  ]
};

// @route GET api/users/test
// @desc Test users route
// @access Public
router.get("/test", (req, res) =>
  res.status(200).json({ message: "User route works" })
);

// @route POST api/users/login
// @desc Log user in
// @access Public
router.post("/login", (req, res) => {
  //Validate input
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Check if password matches
  if (
    req.body.email === db.users[0].email &&
    req.body.password === db.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(401).json(error.message);
  }
});

// @route POST api/users/signup
// @desc Sign new user in
// @access Public
router.post("/signup", (req, res) => {
  //Validate input
  const { errors, isValid } = validateSignupInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    //Check if user already exists
    const user = db.users.filter(user => user.email === req.body.email);

    if (user.length) {
      //Return error if user already exists
      return res.status(400).json("User already exists");
    }

    // Create new user
    const newUser = {
      id: id,
      ...req.body
    };
    id++;
    db.users.push(newUser);

    res.status(201).json(db.users[db.users.length - 1]);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

module.exports = router;
