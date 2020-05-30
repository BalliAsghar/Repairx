const mongoose = require("mongoose");

const UserModel = mongoose.Schema({
  username: { type: String },
  password: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = User = mongoose.model("User", UserModel);
