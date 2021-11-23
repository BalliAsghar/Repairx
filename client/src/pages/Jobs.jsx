import React, { useEffect, useState } from "react";
import JobService from "../Service/Jobs.Service";
import { format } from "date-fns/fp";
import { Link } from "react-router-dom";
import useStore from "../Store/Store";
import LoadingScreen from "../Utils/Loading";
import TrashSvg from "../Utils/Trash";
import Plus from "../Utils/Plus";
import Pending from "../Utils/Pending";
import Status from "../Utils/Status";

function Jobs() {
  const token = useStore((state) => state.token);
  const SetStateJobs = useStore((state) => state.setJobs);
  const Job = useStore((state) => state.jobs);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    async function getJob() {
      const Jobs = await JobService.getAllJobs(token);
      await SetStateJobs(Jobs);
      setLoading(false);
    }
    getJob();
  }, []);

  const pendingJobs = () => Job.filter((job) => job.job_done === false).length;

  if (Loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="grid mt-14 px-3">
      <div className="">
        <Link
          className="ml-3 btn normal-case rounded-btn hover: transform transition duration-500 hover:scale-110"
          to={"/register-job"}
        >
          <Plus />
          Add Job
        </Link>
        <div className="ml-3 btn btn-info rounded-btn normal-case hover: transform transition duration-500 hover:scale-110">
          <Pending />
          Pending Jobs
          <div className="badge ml-2 badge-info">{pendingJobs()}</div>
        </div>
      </div>

      <div className="">
        <table className="table w-full table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Device</th>
              <th>Defect</th>
              <th>Price</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {Job.map((job, index) => (
              <tr key={job._id}>
                <td>{index}</td>

                <td className="text-indigo-600 font-semibold link link-hover">
                    {job.name}
                </td>

                <td>0{job.number}</td>
                <td>{job.item}</td>
                <td>{job.defect}</td>
                <td>£{job.price}</td>
                <td>{format(`PPpp`, new Date(job.date))}</td>
                <td>{<Status JobId={job._id} JobStatus={job.job_done} />}</td>
                <td>{<TrashSvg JobId={job._id} />}</td>
                <td>
                  <div className="badge badge-primary badge-outline">{job.Author}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Jobs;
