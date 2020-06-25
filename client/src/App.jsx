import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateJob from "./CreateJob";
import Login from "./Login";
import GetJobs from "./GetJobs";

export default () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <GetJobs />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <CreateJob />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
