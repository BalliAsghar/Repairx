const express = require("express");
const Job = require("../models/model");
const User = require("../models/user");
const router = express.Router();
const helper = require("../middleware/helper");
const auth = require("../middleware/auth");

router.get("/", (req, res) => {
  res.render("home");
});



module.exports = router;
