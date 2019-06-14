import React, { Component } from 'react';
import './App.css';


import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import File from "./Component/File/File";
import Home from "./Component/Home/Home"
import About from "./Component/About/About"
import SimpleMap from './Component/SimpleMap/SimpleMap';

class App extends Component {
  render() {
    return (


      <Router>
        <div>
          <h2>Welcome to ODG</h2>
         
          <ul className="header">
            <li><NavLink exact to={'/'}> Home </NavLink></li>
            <li><NavLink to={'/Files'}>Files</NavLink></li>
            <li><NavLink to={'/about'}>About</NavLink></li>
          </ul>
          
          <hr />
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
              <Route path="/files" exact component={File} />
              <Route path="/map" exact component={SimpleMap} />
          </Switch>
        </div>
      </Router>
   );
  }
}

export default App;
