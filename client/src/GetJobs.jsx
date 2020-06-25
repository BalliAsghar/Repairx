import React, { useState, useEffect } from "react";
import axios from "axios";

export default () => {
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem("login"));
  const [Jobs, setJobs] = useState([]);

  useEffect(() => {
    axios({
      url: "http://localhost:8080/api/jobs",
      method: "GET",
      headers: {
        "x-auth-token": loggedIn,
      },
    })
      .then((res) => {
        // setJobs([res.data]);
        console.log(res.data);
      })
      .catch((e) => console.log(e));
  });

  return <div>{loggedIn ? <p>loggedIn</p> : <p>pls log in</p>}</div>;
};
