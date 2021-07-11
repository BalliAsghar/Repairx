const express = require("express");
const connectdb = require("./config/db");
const cors = require("cors");
const JobRoutes = require("./routes/jobs.routes");
const UserRoute = require("./routes/user.routes");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

// app initialization
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config({ path: "./config.env" });

// database connection
connectdb();

// index route
app.get("/", (req, res) => {
  res.render(`home`);
});
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
