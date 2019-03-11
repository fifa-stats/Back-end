const express = require("express");
const bodyParser = require("body-parser");

const users = require("./api/users");

const app = express();

//middlewares
app.use(bodyParser.json());

//Use Routes
app.use("/api/users", users);

app.listen(5000, () => console.log("App is running on port 5000"));
