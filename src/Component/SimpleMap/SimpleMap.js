import React, { Component } from 'react';
import axios from "axios";
import { Map, TileLayer, Marker } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import DataTable from '../DataTable/DataTable'
import Cylon from "../LoadingComponents/Cylon"
import Grid from '@material-ui/core/Grid';



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
            this.setState({dataMap:data.rows, lat_col: data.lat_col, lon_col: data.lon_col, cols: data.cols}); 
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
      //console.log(Object.entries(this.state.dataMap))
      //console.log(this.state.dataMap[4][this.state.lat_col])
      //for (let [key,val] in Object.entries(this.state.dataMap) ) {
      //console.log(Object.keys(this.state.dataMap).length)
       for (let i = 0; i < Object.keys(this.state.dataMap).length; i++){
        //console.log(Object.entries(this.state.dataMap)[i])
        let lat = Object.entries(this.state.dataMap)[i][1][this.state.lat_col]
        let lon = Object.entries(this.state.dataMap)[i][1][this.state.lon_col]
        //console.log(lat+"  "+lon)
        markers.push(<Marker  key={i} position={[lat, lon]}/>) 
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
            <DataTable data={this.state.dataMap} header={this.state.cols}/>
          </div>
        );
  }}
}

export default SimpleMap;
