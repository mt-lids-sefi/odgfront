import React, { Component } from 'react';
import { Map, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import Cylon from "../LoadingComponents/Cylon"



class ClusteredMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
         data : this.props.data,
         lat_col : this.props.lat_col,
         lon_col : this.props.lon_col,
         cluster_size: this.props.cluster_size
        };
    }
}
export default ClusteredMap;
