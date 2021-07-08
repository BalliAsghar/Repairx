const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("./config/db");
const cors = require("cors");
const JobRoutes = require("./routes/jobs.routes");
const morgan = require("morgan");
const UserRoute = require("./routes/user.routes");
const dotenv = require("dotenv");
const colors = require("colors");

// app initialization
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

dotenv.config({ path: "./config.env" });

// database connection
connectdb();

// index route
app.get("/", (req, res) => res.status(200).send("Hello"));
app.use("/api", JobRoutes);
app.use("/user", UserRoute);

// Port
const port = process.env.PORT || 8080;

// server initialization
app.listen(port, (err) =>
  console.log(
    `Server Working At Port:`.bold + `${process.env.PORT.underline.bold}`
  )
);
