const express = require("express");
const mongoose = require("mongoose");
const env = require("./env/env");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/routes");
const UserRoute = require("./routes/user.route");
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
app.use("/", UserRoute);
// server initialization
app.listen(env.PORT, (err) => console.log("Server Working"));
