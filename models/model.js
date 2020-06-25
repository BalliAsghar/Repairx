const mongoose = require("mongoose");

// database Schema
const jobmodel = mongoose.Schema({
  name: { type: String, required: true },
  item: { type: String },
  problem: { type: String },
  number: { type: Number },
  price: { type: Number },
  addedby: { type: String },
});

module.exports = Job = mongoose.model("Job", jobmodel);
