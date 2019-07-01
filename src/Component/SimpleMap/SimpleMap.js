import React, { Component } from 'react';
import axios from "axios";
import { Map, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';

import Cylon from "../LoadingComponents/Cylon"



class SimpleMap extends Component {
    constructor(props) {
            super(props);
            this.state = {
             doc_id : this.props.location.mapProps.doc_id
            };
            this.loadFile = this.loadFile.bind(this);
        }

    async componentDidMount() {
        this.loadFile();
        }


    async loadFile()
    {
        let doc_id = this.state.doc_id
        const promise = await axios.get("http://localhost:8000/map/"+doc_id)
        const status = promise.status;
        if(status===200)
        {
            const data = promise.data;
            this.setState({dataMap:data.coords, lat_col: data.lat_col, lon_col: data.lon_col}); 
        }
    }



  render() {
    
    if (this.state.dataMap == null) {
      return <Cylon/>
    }
    else{
      const center = [-34.6131500, -58.3772300]
      const zoom = 13
      let markers = []
      for (let element in Object.keys(this.state.dataMap) ) {
        let lat = this.state.dataMap[element][this.state.lat_col]
        let lon = this.state.dataMap[element][this.state.lon_col]
        markers.push(<Marker  key={element} position={[lat, lon]}/>) 
      }
     

      return (
          <div>
            <Map className="markercluster-map" center={center} zoom={zoom} maxZoom={18}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <MarkerClusterGroup>
                {markers}
            </MarkerClusterGroup>
            </Map>
          </div>
        );
  }}
}

export default SimpleMap;
