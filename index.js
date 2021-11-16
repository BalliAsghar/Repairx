const express = require("express");
const connectdb = require("./config/db");
const cors = require("cors");
const JobRoutes = require("./routes/jobs.routes");
const UserRoute = require("./routes/user.routes");
const dotenv = require("dotenv");
const morgan = require("morgan");

// app initialization
const app = express();

app.use(morgan("dev"));
require("dotenv").config();
app.use(cors());
app.use(express.json());


// database connection
connectdb();

// index route
app.get("/", async (req, res) => {
  res.send("Hello!");
});

app.use("/api", JobRoutes);
app.use("/user", UserRoute);

// Port
const port = process.env.PORT || 8080;

// server initialization
app.listen(port, (err) => console.log(`Server Working At Port ${port}`));
