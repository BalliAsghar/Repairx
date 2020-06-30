const mongoose = require("mongoose");

// database Schema
const jobmodel = mongoose.Schema({
  name: { type: String, required: true },
  item: { type: String },
  problem: { type: String },
  number: { type: Number },
  price: { type: Number },
  status: [
    {
      title: { type: String },
      addedby: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
  addedby: { type: String },
  Date: { type: Date, default: Date.now() },
});

module.exports = Job = mongoose.model("Job", jobmodel);
