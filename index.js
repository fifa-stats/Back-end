const express = require("express");
const bodyParser = require("body-parser");

const users = require("./api/users");

const app = express();

//middlewares
app.use(bodyParser.json());

//Use Routes
app.use("/api/users", users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
