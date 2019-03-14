const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const passport = require("passport");

const users = require("./api/users");
const teams = require("./api/teams");
const players = require("./api/players");

const app = express();

const corsOptions = {
  origin: [process.env.FRONTEND_URL, "http://localhost:3000"]
};

//middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(helmet());
app.use(passport.initialize());
require("./config/passport")(passport);

//Use Routes
app.use("/api/users", users);
app.use("/api/teams", teams);
app.use("/api/players", players);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
