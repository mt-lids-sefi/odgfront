import React, { Component } from 'react';
import 'react-leaflet-markercluster/dist/styles.min.css';
import axios from "axios";
import Cylon from "../LoadingComponents/Cylon"
import { Map, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';


class MutipleMap extends Component {
    constructor(props) {
            super(props);
            this.state = {
              files : this.props.location.mapProps.files
            };
            this.loadFiles = this.loadFiles.bind(this);
        }

    async componentDidMount() {
        this.loadFiles();
        }


    async loadFiles()
    {
        let doc_ids = this.state.files
        let promise = await axios.get("http://localhost:8000/map/"+doc_ids[0])
        let status = promise.status;
        if(status===200)
        {
            const data = promise.data;
            this.setState({dataMap1:data})
        }
        promise = await axios.get("http://localhost:8000/map/"+doc_ids[1])
        status = promise.status;
        if(status===200)
        {
            const data = promise.data;
            this.setState({dataMap2:data})
        }
        
        
        

    }

  


    makeMarkers(dataMap){
      let markers = []
      for (let element in Object.keys(dataMap.coords) ) {
        let lat = dataMap.coords[element][dataMap.lat_col]
        let lon = dataMap.coords[element][dataMap.lon_col]
        markers.push(<Marker  key={element} position={[lat, lon]}/>) 
      }
      return markers
    }

  render() {
    
    if (this.state.dataMap1 == null || this.state.dataMap2 == null) {
      return <Cylon/>
    }
    else{
      const center = [-34.6131500, -58.3772300]
      const zoom = 13
     
      let markers1 = this.makeMarkers(this.state.dataMap1)
      let markers2 = this.makeMarkers(this.state.dataMap2)
      return (
        <div>
          <Map className="markercluster-map" center={center} zoom={zoom} maxZoom={18}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerClusterGroup>
              {markers1}
              {markers2}
          </MarkerClusterGroup>
          </Map>
        </div>
      );
      
  }}
}

export default MutipleMap;
