import React, { Component } from 'react';
import axios from "axios";
import L from 'leaflet';


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
    componentDidMount() {
        // create map
        this.map = L.map('map', {
            center:[-34.6131500, -58.3772300],
            zoom: 16,
            layers: [
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }),
            ]
        });
        }

    async loadFile()
    {
        let doc_id = this.state.doc_id
        const promise = await axios.get("http://localhost:8000/map/"+doc_id);
        const status = promise.status;
        if(status===200)
        {
            const data = promise.data;
            this.setState({dataMap:data.coords});
        }
    }

  render() {
    const position = [-34.6131500, -58.3772300]
    return (
        <div>
          <h2>Mapa</h2>
          <div id="map"></div>
        </div>
      );
  }
}

export default SimpleMap;