import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route } from "react-router-dom";

import File from "./Component/File/index";

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={File} />
    </Router>
    );
  }
}

export default App;
