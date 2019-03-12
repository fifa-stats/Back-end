const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");

const users = require("./api/users");

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5000"
};

//middlewares
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(helmet());

//Use Routes
app.use("/api/users", users);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
