const mongoose = require("mongoose");
const shortid = require("shortid");
// database Schema
const jobmodel = mongoose.Schema({
  ref: {
    type: String,
    default: shortid.generate,
  },
  name: { type: String, required: true },
  item: { type: String },
  defect: { type: String },
  number: { type: Number },
  price: { type: String },
  fixed: { type: Boolean },
  Author: { type: String },
  job_done: { type: Boolean, default: false },
  Date: { type: Date, default: Date.now() },
});

module.exports = Job = mongoose.model("Job", jobmodel);
