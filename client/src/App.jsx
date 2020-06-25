import React from "react";
import CreateJob from "./CreateJob";
import Login from "./Login";

export default () => {
  const login = localStorage.getItem("login");

  return (
    <div className="container-md">{login ? <CreateJob /> : <Login />}</div>
  );
};
