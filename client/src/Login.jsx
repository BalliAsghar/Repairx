import React, { useState } from "react";
import axios from "axios";
import svg from "bootstrap-icons/icons/briefcase.svg";
export default () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios({
      url: "http://localhost:8080/user/login",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        username: username,
        password: password,
      },
    });
    const token = res.data.token;
    localStorage.setItem("token", token);

    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <form className="form-login text-center">
        <img src={svg} height={72} width={72} />
        <h1 className="h3 md-3 font-weight-normal">Login</h1>
        <label className="sr-only">Email address</label>
        <input
          type="username"
          className="form-control m-md-2"
          placeholder="Username"
        />
        <label className="sr-only">Password</label>
        <input
          type="password"
          className="form-control m-md-2"
          placeholder="Password"
          required
        />
        <div className="custom-checkbox mb-3">
          <label>
            <input type="checkbox" defaultValue="remember-me" /> Remember me
          </label>
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
