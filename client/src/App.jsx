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
          <Route exact path="/" component={GetJobs} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={CreateJob} />
        </Switch>
      </Router>
    </div>
  );
};
