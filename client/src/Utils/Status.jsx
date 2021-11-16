import React from "react";
import JobDone from "./JobDone";
import JobNotDone from "./JobNotDone";
const Status = (props) =>
  props.JobStatus ? (
    <JobDone JobId={props.JobId} JobStatus={props.JobStatus} />
  ) : (
    <JobNotDone JobId={props.JobId} JobStatus={props.JobStatus} />
  );
export default Status;
