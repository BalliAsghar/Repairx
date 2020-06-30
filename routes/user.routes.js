const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { exp } = require("../middleware/helper");

// Registry User
router.post("/register", async (req, res) => {
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

    const token = await jwt.sign({ username }, process.env.secretOrKey, {
      expiresIn: exp(),
    });

    return res.json({ token });
  }
  return res.json({ msg: `${username} already exist!` });
});

// Log User In
router.post("/auth", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user == null) {
    return res.json({ msg: "User does not exist!" });
  }

  const checkpwd = await bcrypt.compare(password, user.password);

  if (!checkpwd) {
    return res.json({ msg: "Password do not match!" });
  }

  const token = await jwt.sign(
    { username: user.username },
    process.env.secretOrKey,
    {
      expiresIn: exp(),
    }
  );

  return res.json({ token: token });
});

module.exports = router;
