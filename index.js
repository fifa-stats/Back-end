const express = require("express");
const bodyParser = require("body-parser");

const users = require("./api/users");

const app = express();

//middlewares
app.use(bodyParser.json());

// @route GET /test
// @desc Test server
// @access Public
app.get("/test", (req, res) => {
  res.status(200).json({ message: "success" });
});

//Use Routes
app.use("/api/users", users);

app.listen(5000, () => console.log("App is running on port 5000"));
