import React, { useState } from "react";
import axios from "axios";

export default () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [item, setItem] = useState("");
  const [problem, setProblem] = useState("");
  const [price, setPrice] = useState("");

  const URI = "http://localhost:8080/api/job";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJhbGxpIiwiaWF0IjoxNTkzMDI1NjQ3LCJleHAiOjE1OTM2MzA0NDd9.DIauxRepDSwVkIcbWwQ3jUKZ6VR23HwtfbJicCfeV-0";
  // const data = {
  //   headers: {
  //     "X-Auth-Token": token,
  //     "content-type": "application/json",
  //   },
  // };
  let Job = {
    name,
    item,
    problem,
    number,
    price,
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await axios({
      url: "http://localhost:8080/api/job",
      method: "POST",
      headers: {
        "x-auth-token": localStorage.getItem("login"),
        "Content-Type": "application/json",
      },
      data: Job,
    });
    setName("");
    setItem("");
    setNumber("");
    setPrice("");
    setProblem("");
  };
  return (
    <div>
      <h3>Create Job</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            className="form-control"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Number</label>
          <input
            className="form-control"
            type="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Item</label>
          <input
            className="form-control"
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Problem</label>
          <input
            className="form-control"
            type="text"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Price</label>
          <input
            className="form-control"
            type="Number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <small className="form-text text-muted">Agreed upon price.</small>
        </div>
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
