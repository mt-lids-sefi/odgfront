import React, { Component } from 'react';
import axios from "axios";
import { Map, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';

import Cylon from "../LoadingComponents/Cylon"



class MutipleMap extends Component {
    constructor(props) {
            super(props);
            this.state = {
             
            };
            this.loadFiles = this.loadFiles.bind(this);
        }

    async componentDidMount() {
        this.loadFiles();
        }


    async loadFiles()
    {
        
    }



  render() {
    
    if (this.state.dataMap == null) {
      return <Cylon/>
    }
    else{
      const center = [-34.6131500, -58.3772300]
      const zoom = 13
      
  }}
}

export default MutipleMap;
