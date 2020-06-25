import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

export default () => {
  const token = localStorage.getItem("token");
  let jobs = [];

  const getJobs = () => {
    axios({
      url: "http://localhost:8080/api/jobs",
      method: "GET",
      headers: {
        "x-auth-token": token,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={getJobs}>
        Primary
      </Button>
    </div>
  );
};
