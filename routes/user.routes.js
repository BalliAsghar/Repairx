const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { exp } = require("../middleware/helper");
const { token } = require("morgan");
const _ = require("lodash");
const Job = require("../models/model");
// Registry User
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const checkusername = await User.findOne({
    username,
  });

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

    const token = await jwt.sign(
      {
        username,
      },
      process.env.SecretOrKey,
      {
        expiresIn: exp(),
      }
    );

    return res.json({
      token,
      authenticated: true,
    });
  }
  return res.json({
    message: `${username} already exist!`,
    authenticated: false,
  });
});

// Log User In
router.post("/auth", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({
    username,
  });

  if (user == null) {
    return res.json({
      msg: "User does not exist!",
      authenticated: false,
      statusCode: 404,
    });
  }

  const checkpwd = await bcrypt.compare(password, user.password);

  if (!checkpwd) {
    return res.json({
      msg: "Password do not match!",
      authenticated: false,
      statusCode: 401,
    });
  }

  const token = await jwt.sign(
    {
      username: user.username,
    },
    process.env.SecretOrKey,
    {
      expiresIn: exp(),
    }
  );

  return res.json({
    token: token,
    authenticated: true,
    statusCode: 200,
  });
});

// Verify Jwt
router.get("/verify", async (req, res) => {
  const token = req.headers["x-auth-token"];
  try {
    const decoded = await jwt.verify(token, process.env.SecretOrKey);
    let username = decoded.username;
    return res.json({
      authenticated: true,
      username,
    });
  } catch (err) {
    return res.status(500).json({
      authenticated: false,
      err,
      statusCode: 500,
    });
  }
});

router.get("/profile", async (req, res) => {
  const token = req.headers["x-auth-token"];
  try {
    const decoded = await jwt.verify(token, process.env.SecretOrKey);
    const username = decoded["username"];
    const user = await User.findOne({
      username,
    });
    const res_user = _.pick(user, ["username", "date", "_id"]);
    const Author = res_user.username;
    const UserJobs = await Job.find({ Author: Author });
    return res.status(200).json({
      authenticated: true,
      res_user,
      UserJobs,
    });
  } catch (error) {
    return res.status(404).json({
      authenticated: false,
      error,
    });
  }
});

module.exports = router;
