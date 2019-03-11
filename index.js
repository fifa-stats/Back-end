const express = require("express");

const app = express();

// @route GET /test
// @desc Test server
// @access Public
app.get("/test", (req, res) => {
  res.status(200).json({ message: "success" });
});

app.listen(5000, () => console.log("App is running on port 5000"));
