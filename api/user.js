const express = require("express");
const router = express.Router();

//import validators
const validateLoginInput = require("../validation/login");

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
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    res.status(400).json(errors);
  }

  if (
    req.body.email === db.users[0].email &&
    req.body.password === db.users[0].password
  ) {
    res.json("success");
  } else {
    res.status(401).json("Error logging in");
  }
});

module.exports = router;
