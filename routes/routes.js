const express = require("express");
const Job = require("../models/model");
const router = express.Router();
const mongoose = require("mongoose");
const helper = require("../helper/helper");
// job post route
router.post("/job", async (req, res) => {
  const job = new Job({
    name: req.body.name,
    item: req.body.item,
    problem: req.body.problem,
    number: req.body.number,
    price: req.body.price,
  });

  const save = await job.save();

  console.log(save);

  return res.json({ msg: "Job Saved!" });
});

// Get all jobs
router.get("/jobs", async (req, res) => {
  const job = await Job.find({});
  res.json(job);
});

// Get Job by Id
router.get("/job/:_id", async (req, res) => {
  const _id = req.params._id;
  if (!helper.isValidId(_id)) {
    return res.json({ msg: "ID Not Valid" });
  }
  const job = await Job.findById({ _id });

  return res.json(job);
});

// remove job
router.post("/job/:_id", async (req, res) => {
  const _id = req.params._id;
  if (!helper.isValidId(_id)) {
    return res.json({ msg: "ID Not Valid" });
  }
  const remove = await Job.findByIdAndRemove(_id);

  return res.json({ msg: `Job ${_id} removed` });
});
// Update Job
router.put("/updatejob/:_id", async (req, res) => {
  const _id = req.params._id;

  if (helper.isValidId(_id)) {
    const job = await Job.findById(_id);
    if (job == null) {
      return res.json({ msg: "Job does not exist" });
    }
    const updateit = await job.update(req.body);
    return res.json(updateit);
  }
  return res.json({ msg: "Invalid ID" });
});

module.exports = router;
