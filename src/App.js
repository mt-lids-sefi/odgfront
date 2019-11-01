import React, { Component } from 'react';
import './App.css';


import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import File from "./Component/File/File";
import Home from "./Component/Home/Home"
import About from "./Component/About/About"
import SimpleMap from './Component/SimpleMap/SimpleMap';
import FileUploader from './Component/FileUploader/FileUploader';
import Merge from './Component/Merge/Merge';
import MutipleMap from './Component/MultipleMap/MultipleMap';
import {Navbar,  Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import MergeMenu from './Component/Merge/MergeMenu';
import LinkFiles from './Component/LinkFiles/LinkFIles';
import ClosestPoint from './Component/LinkFiles/ClosestPoint';
import Polygon from './Component/LinkFiles/Polygon';
import Clusterize from './Component/Clusterize/Clusterize'
import Clusterizer from './Component/Clusterize/Clusterizer';

class App extends Component {
  render() {
    return (


    
        <div>
         <Router>
         <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">ODG</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/files">Files</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/merge">Merge</Nav.Link>
            <Nav.Link href="/fileuploader">Upload</Nav.Link>
            <Nav.Link href="/clusterize">Clusterize</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/clusterize' component={Clusterize} />
              <Route path='/about' component={About} />
              <Route path="/files" exact component={File} />
              <Route path="/map" exact component={SimpleMap} />
              <Route path="/fileuploader" exact component={FileUploader} />
              <Route path="/merge" exact component={Merge} />
              <Route path="/mergemenu" exact component={MergeMenu} />
              <Route path="/multmap" exact component={MutipleMap} />
              <Route path="/linkfiles" exact component={LinkFiles} />
              <Route path="/closestpoint" exact component={ClosestPoint} />
              <Route path="/polygon" exact component={Polygon} />
              <Route path="/clusterizer" exact component={Clusterizer} />
          </Switch>
        </Router>      
        </div>
    
   );
  }
}

export default App;
/**     <ul className="header">
            <li><NavLink exact to={'/'}> Home </NavLink></li>
            <li><NavLink to={'/files'}>Files</NavLink></li>
            <li><NavLink to={'/about'}>About</NavLink></li>
            <li><NavLink to={'/fileuploader'}>Upload</NavLink></li>
            <li><NavLink to={'/merge'}>Merge</NavLink></li>
          </ul> */


          /*
            <Router>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
              <Route path="/files" exact component={File} />
              <Route path="/map" exact component={SimpleMap} />
              <Route path="/fileuploader" exact component={FileUploader} />
              <Route path="/merge" exact component={Merge} />
              <Route path="/multmap" exact component={MutipleMap} />
          </Switch>
            </Router>




             <Router>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="/">ODG</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/files">Files</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/merge">Merge</Nav.Link>
            <Nav.Link href="/fileuploader">Upload</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
     
          
          <hr />

          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
              <Route path="/files" exact component={File} />
              <Route path="/map" exact component={SimpleMap} />
              <Route path="/fileuploader" exact component={FileUploader} />
              <Route path="/merge" exact component={Merge} />
              <Route path="/multmap" exact component={MutipleMap} />
          </Switch>
        </Router>     
          */ 