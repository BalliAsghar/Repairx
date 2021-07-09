const mongoose = require("mongoose");

// database Schema
const jobmodel = mongoose.Schema({
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
  Date: { type: Date, default: Date.now() },
});

module.exports = Job = mongoose.model("Job", jobmodel);
