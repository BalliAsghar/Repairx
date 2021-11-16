import React from "react";
import JobService from "../Service/Jobs.Service";
import useStore from "../Store/Store";
const JobNotDone = (props) => {
  const token = useStore((state) => state.token);
  const UpdateStatus = async () => {
    await JobService.changeStatus(props.JobId, false, token);
    location.reload();
  };

  return (
    <div data-tip="Click to Change Job Status" className="tooltip" onClick={() => UpdateStatus()}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
        />
      </svg>
    </div>
  );
};

export default JobNotDone;
