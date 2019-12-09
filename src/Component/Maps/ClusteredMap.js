import React, { Component } from 'react';
import { Map, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import Cylon from "../LoadingComponents/Cylon"
import  { getIconByNumber} from  '../../Utils/utils' 

import {LayersControl } from "react-leaflet";
const {Overlay } = LayersControl

class ClusteredMap extends Component {

    constructor(props) {
        super(props);
        this.state = {
         lat_col : this.props.lat_col,
         lon_col : this.props.lon_col,
         cluster_size: this.props.cluster_size,
         clustered_data: this.props.clustered_data,
         col_x: this.props.col_x, 
         col_y: this.props.col_y
        };
    }

    makeMarkers(dataMap){
        let markers = [] 
        for (let i = 0; i < this.state.cluster_size; i++){
            markers.push(i)
            markers[i] = []
        }
        for (let i = 0; i < Object.keys(dataMap).length; i++){
          let c = Object.entries(dataMap)[i][1]['cluster']
          let lat = Object.entries(dataMap)[i][1][this.state.lat_col]
          let lon = Object.entries(dataMap)[i][1][this.state.lon_col]
          markers[c].push(<Marker  key={i} position={[lat, lon]} icon={getIconByNumber(c)} />)
        }
        return markers
      }

    makeOverlays(markers){
        let overlays = []
        for (let i = 0; i < markers.length; i++){
            let overlay = <Overlay checked name={"Cluster n° "+i}>
                                <MarkerClusterGroup> {markers[i]} </MarkerClusterGroup>  
                           </Overlay>
            overlays.push(overlay)
        }
        return overlays
    }

    render (){

        if (this.state.clustered_data == null) {
            return <Cylon/>
        }
        else { 
            const center = [-34.6131500, -58.3772300]
            const zoom = 13
            let markers = this.makeMarkers(this.state.clustered_data)
            let overlays = this.makeOverlays(markers)
            console.log(markers)
            console.log(overlays)
            return (
                <div>
                    <Map className="markercluster-map" center={center} zoom={zoom} maxZoom={18}>
                        <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        />
                        <LayersControl collapsed position="topright">
                            {overlays}
                       </LayersControl>
                    
                    </Map>
                </div>
            );
        }
    }
}
export default ClusteredMap;
