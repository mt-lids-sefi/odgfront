import React, { Component } from 'react';
import 'react-leaflet-markercluster/dist/styles.min.css';
import axios from "axios";
import Cylon from "../LoadingComponents/Cylon"
import { Map, TileLayer, Marker, LayerGroup, LayersControl } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import  {getIcon} from  '../../Utils/utils' 
const { BaseLayer, Overlay } = LayersControl

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
        let promise = await axios.get("http://localhost:8000/geo_file/"+doc_ids[0])
        let status = promise.status;
        if(status===200)
        {
            const data = promise.data;
            this.setState({dataMapA:data})
        }
        promise = await axios.get("http://localhost:8000/geo_file/"+doc_ids[1])
        status = promise.status;
        if(status===200)
        {
            const data = promise.data;
            this.setState({dataMapB:data})
        }
    }

    makeMarkers(dataMap, icon){
      let markers = []
      for (let i = 0; i < Object.keys(dataMap.rows).length; i++){
        //console.log(Object.entries(this.state.dataMap)[i])
        let lat = Object.entries(dataMap.rows)[i][1][dataMap.lat_col]
        let lon = Object.entries(dataMap.rows)[i][1][dataMap.lon_col]
        //console.log(lat+"  "+lon)
        markers.push(<Marker  key={i} position={[lat, lon]} icon={icon} />)
      }
      
      return markers
    }

  render() {
    const greenIcon = getIcon('green')
    const violetIcon = getIcon('violet')

    if (this.state.dataMapA == null || this.state.dataMapB == null){
      return <Cylon/>
    }
    else{
      const center = [-34.6131500, -58.3772300]
      const zoom = 13
      
      let markersA = this.makeMarkers(this.state.dataMapA, greenIcon)
      let markersB = this.makeMarkers(this.state.dataMapB, violetIcon)
      return (
        <div>
          <Map className="markercluster-map" center={center} zoom={zoom} maxZoom={18}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
              <LayersControl collapsed position="topright">

              <Overlay checked name={this.state.dataMapA.name+" (green colour)"}>
                <MarkerClusterGroup> {markersA} </MarkerClusterGroup>  
              </Overlay>
              <Overlay checked name={this.state.dataMapB.name+ " (purple colour)"}>
                <MarkerClusterGroup> {markersB} </MarkerClusterGroup>  
              </Overlay>
              </LayersControl>
          
          </Map>
        </div>
      );
      
  }}
}

export default MutipleMap;