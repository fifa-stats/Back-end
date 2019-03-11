const express = require("express");

const users = require("./api/user");

const app = express();

// @route GET /test
// @desc Test server
// @access Public
app.get("/test", (req, res) => {
  res.status(200).json({ message: "success" });
});

//Use Routes
app.use("/api/users", users);

app.listen(5000, () => console.log("App is running on port 5000"));
