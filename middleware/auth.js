const jwt = require("jsonwebtoken");
const key = require("../config/config.env").secretOrKey;
module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    jwt.verify(token, key, (error, decoded) => {
      if (error == null) {
        req.user = decoded;
        next();
      } else {
        return res.json({ msg: "Not a Valid Token, authorization denied" });
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
