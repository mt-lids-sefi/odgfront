import React, { Component } from 'react';
import 'react-leaflet-markercluster/dist/styles.min.css';
import axios from "axios";
import Cylon from "../LoadingComponents/Cylon"
import { Map, TileLayer, Marker,  LayersControl , Popup } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import  {getIcon} from  '../../Utils/utils' 
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DetailsCard from '../FileDetails/DetailsCard';
import { Row, Col } from 'react-bootstrap';
const {Overlay } = LayersControl


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  paper: { 
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  }
});

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
        let lat = Object.entries(dataMap.rows)[i][1][dataMap.lat_col]
        let lon = Object.entries(dataMap.rows)[i][1][dataMap.lon_col]
        let popup_data = "File: " + dataMap.name + " "
        let n = 0
        for (const key in Object.entries(dataMap.rows)[i][1]) {
            if (n<5 && (key != dataMap.lat_col || key != dataMap.lon_col))  {
                n +=1
                popup_data += key+": "+Object.entries(dataMap.rows)[i][1][key]+" "
            }
        }
        markers.push(<Marker key={i} position={[lat, lon]} icon={icon}> <Popup> {popup_data} </Popup> </Marker> )
      }
      
      return markers
    }

  render() {
    const { classes } = this.props;
    const greenIcon = getIcon(2)
    const violetIcon = getIcon(3)

    if (this.state.dataMapA == null || this.state.dataMapB == null){
      return <Cylon/>
    }
    else{
      const center = [-34.6131500, -58.3772300]
      const zoom = 13
      
      let markersA = this.makeMarkers(this.state.dataMapA, greenIcon)
      let markersB = this.makeMarkers(this.state.dataMapB, violetIcon)
      return (
        <Paper className={classes.paper}>
        <div className={classes.root}>
        <Paper className={classes.paper}>
          <Typography variant="h6" id="tableTitle" align="left">
           Mapa en capas - {this.state.dataMapA.name} + {this.state.dataMapB.name}
          </Typography>
        </Paper>
          <Row>
          <Col sm={9}>  
          <div>
            <Map className="markercluster-map" center={center} zoom={zoom} maxZoom={18}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
                <LayersControl collapsed position="topright">

                <Overlay checked name={this.state.dataMapA.name}>
                  <MarkerClusterGroup> {markersA} </MarkerClusterGroup>  
                </Overlay>
                <Overlay checked name={this.state.dataMapB.name}>
                  <MarkerClusterGroup> {markersB} </MarkerClusterGroup>  
                </Overlay>
                </LayersControl>
            </Map>
        </div>
        </Col>
        <Col sm={2}>
        <DetailsCard file_id={this.state.files[0]} />
        <DetailsCard file_id={this.state.files[1]} />
        </Col>
        </Row>
        </div>
        </Paper>
      );
      
  }}
}

MutipleMap.propTypes = {
  classes: PropTypes.object.isRequired,
};

  
export default withStyles(styles)(MutipleMap);