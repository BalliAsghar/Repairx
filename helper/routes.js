const express = require("express");
const Job = require("./model");
const router = express.Router();
// job post route
router.post("/job", (req, res) => {
  const job = new Job({
    name: req.body.name,
    item: req.body.item,
    problem: req.body.problem,
    number: req.body.number,
    price: req.body.price,
  });

  job
    .save()
    .then((err, done) => {
      if (err) {
        throw err;
      }
      res.json({ msg: "Job DONE" });
    })
    .catch((err) => res.json(err));
});
// Get all jobs
router.get("/jobs", (req, res) => {
  Job.find({})
    .then((job) => {
      res.json(job);
    })
    .catch((err) => res.json(err));
});
// remove job
router.post("/job/:_id", (req, res) => {
  Job.findByIdAndRemove(req.params._id)
    .then((done) => {
      console.log(done);
      res.json({ msg: `job removed by ${req.params._id}` });
    })
    .catch((err) => res.json(err));
});
// Update Job
router.post("/updatejob/:_id", (req, res) => {
  // still need to find better way to do!
});

module.exports = router;
