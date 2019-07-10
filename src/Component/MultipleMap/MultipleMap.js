import React, { Component } from 'react';
import 'react-leaflet-markercluster/dist/styles.min.css';

import Cylon from "../LoadingComponents/Cylon"



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
