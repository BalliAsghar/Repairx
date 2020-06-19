const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = require("../config/config.env").secretOrKey;
const Job = require("../models/model");
const auth = require("../middleware/auth");
const { exp } = require("../middleware/helper");

// Registry User
router.post("/user", async (req, res) => {
  const { username, password } = req.body;
  const checkusername = await User.findOne({ username });

  if (checkusername == null) {
    const user = new User({
      username,
      password,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        username: user.username,
      },
    };

    const token = await jwt.sign({ username }, key, { expiresIn: exp() });

    return res.json({ token });
  }
  return res.json({ msg: `${username} already exist!` });
});

// Log User In
router.post("/user/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user == null) {
    return res.json({ msg: "User does not exist!" });
  }

  const checkpwd = await bcrypt.compare(password, user.password);

  if (!checkpwd) {
    return res.json({ msg: "Password do not match!" });
  }

  const token = await jwt.sign({ username: user.username }, key, {
    expiresIn: exp(),
  });

  return res.json({ token: token });
});

// get job by user
router.get("/my/jobs", auth, async (req, res) => {
  const username = req.user.username;
  const user = await Job.find({ addedby: username });

  if (user.length <= 0) {
    return res.json({ msg: "No Jobs!" });
  }

  return res.json({ size: user.length, jobs: user });
});

module.exports = router;
