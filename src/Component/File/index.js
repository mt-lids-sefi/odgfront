import React, { Component } from "react";

import axios from "axios";

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
      const data = promise.data.data;
      this.setState({files:data});
    }
  }

  render() {
    return(
      <div>
        <h1>Files</h1>
            {this.state.files.map((value,index)=>{return <h4 key={index}>{value}</h4>})}
      </div>
    )
  }
}
