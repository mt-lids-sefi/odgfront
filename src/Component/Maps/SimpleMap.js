import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'react-leaflet-markercluster/dist/styles.min.css';
import Cylon from "../LoadingComponents/Cylon"
import  { getIconByNumber, getIcon} from  '../../Utils/utils' 


class SimpleMap extends Component {
    constructor(props) {
            super(props);
            this.state = {
             data : this.props.data,
             lat_col : this.props.lat_col,
             lon_col : this.props.lon_col
            };
        }

  render() {    
    if (this.state.data == null) {
      return <Cylon/>
    }
    else{
      const center = [-34.6131500, -58.3772300]
      const zoom = 13
      let markers = []
       for (let i = 0; i < Object.keys(this.state.data).length; i++){
        let lat = Object.entries(this.state.data)[i][1][this.state.lat_col]
        let lon = Object.entries(this.state.data)[i][1][this.state.lon_col]
        let popup_data = ""
        let n = 0
        for (const key in Object.entries(this.state.data)[i][1]) {
          if (n<5 && (key != this.state.lat_col || key != this.state.lon_col))  {
            n +=1
            popup_data += key+": "+Object.entries(this.state.data)[i][1][key]+" "
          }
        }
        markers.push(<Marker  key={i} position={[lat, lon]} icon={getIcon(1)}><Popup> {popup_data} </Popup></Marker>) 
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
