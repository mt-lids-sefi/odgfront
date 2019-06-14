import React, { Component } from 'react';
import axios from "axios";

class SimpleMap extends Component {
    constructor(props) {
            super(props);
            this.state = {
             doc_id : this.props.location.mapProps.doc_id,
             files:[],
            };
            this.loadFile = this.loadFile.bind(this);
        }

    componentWillMount() {
        this.loadFile();
        }

    async loadFile()
    {
        let doc_id = this.state.doc_id
        const promise = await axios.get("http://localhost:8000/map/"+doc_id);
        const status = promise.status;
        if(status===200)
        {
            const data = promise.data;
            this.setState({dataMap:data});
        }
    }

  render() {
    //en this.props.location.mapProps traigo el map_id
    return (
        <div>
          <h2>Map</h2>
        </div>
    );
  }
}

export default SimpleMap;