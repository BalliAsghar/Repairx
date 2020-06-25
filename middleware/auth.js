const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    jwt.verify(token, process.env.secretOrKey, (error, decoded) => {
      if (error == null) {
        req.user = decoded;
        next();
      } else {
        return res.json({
          Status: 401,
          msg: "Not a Valid Token, authorization denied",
        });
      }
    });
  } catch (err) {
    console.error("something wrong with auth middleware");
    res.status(500).json({ msg: "Server Error" });
  }
};
