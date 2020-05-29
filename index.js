const express = require("express");
const mongoose = require("mongoose");
const env = require("./env/env");
const bodyParser = require("body-parser");
const cors = require("cors");
const Job = require("./models/model");
const routes = require("./routes/routes");

// app initialization
const app = express();
app.use(bodyParser.json());
app.use(cors());

// database connection
mongoose.connect(
  env.DBURL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    if (err) throw err;
    console.log("db Working");
  }
);

// index route
app.get("/", (req, res) => res.send("Hello"));
app.use("/", routes);
// server initialization
app.listen(env.PORT, (err) => console.log("Server Working"));
