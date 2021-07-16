const express = require("express");
const connectdb = require("./config/db");
const cors = require("cors");
const JobRoutes = require("./routes/jobs.routes");
const UserRoute = require("./routes/user.routes");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");

// app initialization
const app = express();
app.use(morgan("dev"));

require('dotenv').config()
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// database connection
connectdb();

// index route
app.get("/", async (req, res) => {
  const jobs = await Job.find({});
  // console.log(jobs);
  res.render("home", { jobs });
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/job/:id", async (req, res) => {
  const job = await Job.findById(req.params.id);
  console.log(job);
  res.render("job", { job });
});

app.get("/register", (req, res) => res.render("register"));
app.use("/api", JobRoutes);
app.use("/user", UserRoute);

// Port
const port = process.env.PORT || 8080;

// server initialization
app.listen(3000, (err) =>
  console.log(
    `Server Working At Port ${port}`
  )
);
