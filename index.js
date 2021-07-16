const express = require("express");
const connectdb = require("./config/db");
const cors = require("cors");
const JobRoutes = require("./routes/jobs.routes");
const UserRoute = require("./routes/user.routes");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const ejsMate = require("ejs-mate");

// app initialization
const app = express();

app.use(morgan("dev"));
require('dotenv').config()
app.engine('ejs', ejsMate)
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
  if(job === null){
     return res.render("404");
    console.log("404");
  } 
  return res.render("job", { job });
});

app.get("/register", (req, res) => res.render("register"));
app.use("/api", JobRoutes);
app.use("/user", UserRoute);

// Port
const port = process.env.PORT || 8080;

// 404
app.use((req, res) => {
  res.status(404).render("404");
})

// server initialization
app.listen(3000, (err) =>
  console.log(
    `Server Working At Port ${port}`
  )
)