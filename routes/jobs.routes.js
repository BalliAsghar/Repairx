const express = require("express");
const Job = require("../models/model");
const User = require("../models/user");
const router = express.Router();
const helper = require("../middleware/helper");
const auth = require("../middleware/auth");

// job post route
router.post("/job", auth, async (req, res) => {
  const job = new Job({
    name: req.body.name,
    item: req.body.item,
    defect: req.body.defect,
    number: req.body.number,
    price: req.body.price,
    status: {
      title: req.body.status.title,
      Author: req.user.username,
    },
    Author: req.user.username,
  });
  const save = await job.save();

  return res.json({ Status: 201, msg: "Job Saved!" });
});
// Get all jobs
router.get("/jobs", auth, async (req, res) => {
  const jobs = await Job.find({});
  res.json(jobs);
});

// Get Job by Id
router.get("/job/:_id", auth, async (req, res) => {
  const _id = req.params._id;
  if (!helper.isValidId(_id)) {
    return res.json({ msg: "ID Not Valid" });
  }
  const job = await Job.findById({ _id });

  return res.json({ Status: 200, job });
});

// remove job
router.delete("/job/:_id", auth, async (req, res) => {
  const _id = req.params._id;
  if (!helper.isValidId(_id)) {
    return res.json({ msg: "ID Not Valid" });
  }
  const removejob = await Job.findByIdAndRemove(_id);
  if (removejob == null) {
    return res.json({ msg: "Job Doesn't exist!'" });
  }
  return res.json({ msg: `Job ${_id} removed` });
});

// Update Job
router.put("/updatejob/:_id", auth, async (req, res) => {
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

// get job by user
router.get("/my-jobs", auth, async (req, res) => {
  const Author = req.user.username;
  const user = await Job.find({ Author: Author });

  if (user.length <= 0) {
    return res.json({ msg: "No Jobs!" });
  }

  return res.json({ size: user.length, jobs: user });
});

// Update Job Status
router.put("/Update-status/:_id", auth, async (req, res) => {
  const id = req.params._id;
  const status = {
    title: req.body.title,
    Author: req.user.username,
  };

  const job = await Job.findByIdAndUpdate(id, { $push: { status: status } });

  return res.json({ msg: "I belive is done!" });
});

// Get Job Status by ID
router.get("/status/:_id", auth, async (req, res) => {
  const id = req.params._id;
  try {
    if (helper.isValidId(id)) {
      const job = await Job.findById(id);

      if (job == null) {
        return res.json({ msg: "Job Not Found!" });
      }

      return res.json(job.status);
    }
    return res.json({ msg: "Id not valid" });
  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
