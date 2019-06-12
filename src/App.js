import React, { Component } from 'react';
import './App.css';


import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import File from "./Component/File/index";
import Home from "./Component/Home/index"
import About from "./Component/About/index"

class App extends Component {
  render() {
    return (


      <Router>
        <div>
          <h2>Welcome to ODG</h2>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav mr-auto">
            <li><Link to={'/'} className="nav-link"> Home </Link></li>
            <li><Link to={'/Files'} className="nav-link">Files</Link></li>
            <li><Link to={'/about'} className="nav-link">About</Link></li>
          </ul>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
              <Route path="/files" exact component={File} />
          </Switch>
        </div>
      </Router>
   );
  }
}

export default App;
