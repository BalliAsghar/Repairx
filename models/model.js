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
  status: [
    {
      title: { type: String, default: "Job Registered" },
      Author: { type: String },
      date: { type: Date, default: Date.now },
    },
  ],
  Author: { type: String },
  job_done: {type: Boolean},
  Date: { type: Date, default: Date.now() },
});

module.exports = Job = mongoose.model("Job", jobmodel);
