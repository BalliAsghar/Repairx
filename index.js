const express = require("express");
const connectdb = require("./config/db");
const cors = require("cors");
const JobRoutes = require("./routes/jobs.routes");
const UserRoute = require("./routes/user.routes");
const path = require("path");

const morgan = require("morgan");

// app initialization
const app = express();

app.use(morgan("dev"));
require("dotenv").config();
app.use(cors());
app.use(express.json());

// database connection
connectdb();

console.log(process.env);

app.use("/api", JobRoutes);
app.use("/user", UserRoute);

app.use(express.static("client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

// Port
const port = process.env.PORT || 8080;

// server initialization
app.listen(port, (err) => console.log(`Server Working At Port ${port}`));
