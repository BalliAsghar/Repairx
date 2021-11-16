import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterJob from './pages/RegisterJob';
import ViewJob from './pages/ViewJob';
import Profile from './pages/Profile';
import NavBar from './Utils/NavBar';
function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
        <Route path="/register-job" component={RegisterJob}></Route>
        <Route exact path="/job/:id" component={ViewJob}></Route>
        <Route exact path="/profile/:username" component={Profile}></Route>
      </Switch>
    </Router>
  );
}

export default App;
