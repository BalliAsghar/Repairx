const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../env/env").secretOrKey;

// Registry for User
router.post("/user", async (req, res) => {
  const { username, password } = req.body;

  let user = await User.findOne({ username });

  if (user) {
    return res.json({ msg: "User already exists!" });
  }

  user = new User({
    username,
    password,
  });
  // username not saving in db.
  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);

  await user.save();

  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(payload, key, { expiresIn: "360000" }, (err, token) => {
    if (err) throw err;
    res.json({ token });
  });
});

// Log User In
router.post("/user/login", async (req, res) => {});
module.exports = router;
