import React, { Component } from 'react';
import './App.css';


import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import File from "./Component/File/File";
import Home from "./Component/Home/Home"
import About from "./Component/About/About"
import FileDetails from './Component/FileDetails/FileDetails';
import FileUploader from './Component/FileUploader/FileUploader';
import DataFileUploader from './Component/FileUploader/DataFileUploader';
import Merge from './Component/Merge/Merge';
import MutipleMap from './Component/MultipleMap/MultipleMap';
import {Navbar,  Nav, NavDropdown} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import MergeMenu from './Component/Merge/MergeMenu';
import LinkFiles from './Component/LinkFiles/LinkFIles';
import ClosestPoint from './Component/LinkFiles/ClosestPoint';
import Polygon from './Component/LinkFiles/Polygon';
import Clusterizer from './Component/Clusterize/Clusterizer';
import DataFiles from './Component/File/DataFiles';
import Similarity from './Component/LinkFiles/Similarity';
import Configurations from './Component/Visualizations/Configurations';
import ClusterVisualization from './Component/Visualizations/ClusterVisualization';

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
            <NavDropdown title="Carga" id="basic-nav-dropdown">
              <NavDropdown.Item href="/fileuploader">Conjunto de datos georeferenciados</NavDropdown.Item>
              <NavDropdown.Item href="/datafileuploader">Conjunto de datos</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Conjuntos de datos" id="basic-nav-dropdown" href="/files">
              <NavDropdown.Item href="/files">Datos georeferenciados</NavDropdown.Item>
              <NavDropdown.Item href="/datafiles">Datos </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/merge">Combinar</Nav.Link>
            <Nav.Link href="/configurations">Configuraciones</Nav.Link>
            <Nav.Link href="/about">Acerca de...</Nav.Link>
          </Nav>
          </Navbar.Collapse>
        </Navbar>
          <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/about' component={About} />
              <Route path="/files" exact component={File} />
              <Route path="/datafiles" exact component={DataFiles} />
              <Route path="/details" exact component={FileDetails} />
              <Route path="/fileuploader" exact component={FileUploader} />
              <Route path="/datafileuploader" exact component={DataFileUploader} />
              <Route path="/merge" exact component={Merge} />
              <Route path="/mergemenu" exact component={MergeMenu} />
              <Route path="/multmap" exact component={MutipleMap} />
              <Route path="/linkfiles" exact component={LinkFiles} />
              <Route path="/closestpoint" exact component={ClosestPoint} />
              <Route path="/polygon" exact component={Polygon} />
              <Route path="/clusterizer" exact component={Clusterizer} />
              <Route path="/similcols" exact component={Similarity} />
              <Route path="/configurations" exact component={Configurations} />
              <Route path="/view_conf" exact component={ClusterVisualization} />
          </Switch>
        </Router>      
        </div>
    
   );
  }
}

export default App;