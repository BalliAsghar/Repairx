import React, { Component } from "react";
// eslint-disable-next-line
import axios from "axios";

class App extends Component {
  constructor() {
    super();

    this.state = {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFzZ2hhciIsImlhdCI6MTU5MzUzMzA5MywiZXhwIjoxNTk0MTM3ODkzfQ.fw2SuaE51upYqSBjiOU1YerWD_ykrxsWXwrvaa5stVQ",
    };
  }
  render() {
    return <p>Hello</p>;
  }
}

export default App;
