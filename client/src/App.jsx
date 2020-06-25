import React from "react";
import CreateJob from "./CreateJob";
import Login from "./Login";
import GetJobs from "./GetJobs";

export default () => {
  const login = localStorage.getItem("login");

  return (
    // <div className="container-md">{login ? <CreateJob /> : <Login />}</div>
    <div className="container-md">
      <GetJobs />
    </div>
  );
};
