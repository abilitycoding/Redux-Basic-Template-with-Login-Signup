const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const bodyParser = require("body-parser");
/* Don't Remove Import db connection */
const mongoose = require("./src/config/db");

const userController = require("./src/controller/user.controller");

app.use(bodyParser.json()); 

app.use("/", userController);

app.listen(PORT, () => {
  console.log(`Server listening at the PORT: ${PORT}`);
});
