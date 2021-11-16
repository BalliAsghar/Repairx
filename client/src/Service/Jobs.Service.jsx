import axios from "axios";
const URI = "http://localhost:8080/api";
const config = (token) => {
  return {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": token,
    },
  };
};
const getAllJobs = async (token) => {
  const Jobs = await axios.get(`${URI}/jobs`, {
    headers: {
      "Content-type": "application/json",
      "x-auth-token": token,
    },
  });
  return Jobs.data;
};

const registerJob = async (values, token) => {
  const Job = await axios.post(
    `${URI}/job`,
    {
      name: values.name,
      item: values.device,
      defect: values.defect,
      number: Number(values.number),
      price: Number(values.price),
    },
    {
      headers: {
        "Content-type": "application/json",
        "x-auth-token": token,
      },
    }
  );
  return Job.data;
};

const changeStatus = async (id, status, token) => {
  const UpdateStatus = await axios.put(`${URI}/Update-status/${id}/`, { status: status }, config(token));
  if (UpdateStatus.data.Status === 200) {
    return {
      JobUpdated: true,
    };
  } else {
    return {
      JobUpdated: false,
    };
  }
};

const removeJob = async (id, token) => {
  const RemovedJob = await axios.delete(`${URI}/job/${id}/`, config(token));

  if (RemovedJob.data.jobRemoved === true) {
    return {
      JobRemoved: true,
    };
  } else {
    return {
      JobRemoved: false,
      message: RemovedJob.data.msg,
    };
  }
};

const obj = {
  getAllJobs,
  registerJob,
  changeStatus,
  removeJob,
};

export default obj;
