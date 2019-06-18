import React, { Component } from 'react';
import axios from "axios";
import { Map, TileLayer } from "react-leaflet";


class SimpleMap extends Component {
    state = {
        center: [51.505, -0.091],
        zoom: 13
      };
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
            this.setState({dataMap:data.coords});
        }
    }

  render() {
    const center = [-34.6131500, -58.3772300]
    const zoom = 13
    return (
        <div>
          <Map center={center} zoom={zoom}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
          </Map>
        </div>
      );
  }
}

export default SimpleMap;