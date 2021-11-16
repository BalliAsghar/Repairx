import React from "react";
import JobService from "../Service/Jobs.Service";
import useStore from "../Store/Store";
const JobDone = (props) => {
  const token = useStore((state) => state.token);
  const UpdateStatus = async () => {
    await JobService.changeStatus(props.JobId, true, token);
    location.reload();
  };
  return (
    <div data-tip="Click to Change Job Status" className="tooltip" onClick={() => UpdateStatus()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-green-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
};

export default JobDone;
