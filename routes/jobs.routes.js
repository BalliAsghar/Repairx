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
    problem: req.body.problem,
    number: req.body.number,
    price: req.body.price,
    status: {
      title: req.body.status.title,
      addedby: req.user.username,
    },
    addedby: req.user.username,
  });
  const save = await job.save();

  return res.json({ Status: 201, msg: "Job Saved!" });
});

// Get all jobs
router.get("/jobs", auth, async (req, res) => {
  const job = await Job.find({});
  res.json({ Status: 200, job });
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
router.post("/job/:_id", auth, async (req, res) => {
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

// // Update Job Status
// router.post("/job-status/:_id", auth, async (req, res) => {
//       const _id = req.params._id;
//       if(helper.isValidId(_id)){
//         const job = await.
//       }
// })

// get job by user
router.get("/my-jobs", auth, async (req, res) => {
  const username = req.user.username;
  const user = await Job.find({ addedby: username });

  if (user.length <= 0) {
    return res.json({ msg: "No Jobs!" });
  }

  return res.json({ size: user.length, jobs: user });
});

module.exports = router;
