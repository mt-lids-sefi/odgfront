import React, { Component } from "react";
import axios from "axios";
import SimpleMap from '../SimpleMap/SimpleMap'
import { BrowserRouter as  Route, Link } from 'react-router-dom';
export default class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
    files:[],
    };
    this.loadFiles = this.loadFiles.bind(this);
  }

  componentWillMount() {
    this.loadFiles();
  }

  async loadFiles()
  {
    const promise = await axios.get("http://localhost:8000/file");
    const status = promise.status;
    if(status===200)
    {
      const data = promise.data;
      this.setState({files:data});
    }
  }

  render() {
    return(
      <div>
        <h1>Files</h1>
            {this.state.files.map((index) => {return <h4 key={index.document_id}>{index.name+", "+index.description}
              <li><Link to={{pathname: '/map', mapProps:{doc_id: index.document_id}}}>Ver Mapa</Link></li>
               
              </h4>})}
      </div>
    )
  }
}
