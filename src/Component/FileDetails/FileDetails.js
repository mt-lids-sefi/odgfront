import React, { Component } from 'react';
import axios from "axios";
import 'react-leaflet-markercluster/dist/styles.min.css';
import DataTable from '../DataTable/DataTable'
import Cylon from "../LoadingComponents/Cylon"
import SimpleMap from '../Maps/SimpleMap';



class FileDetails extends Component {
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
      return (
          <div>
            <SimpleMap data={this.state.dataMap} lat_col={this.state.lat_col} lon_col={this.state.lon_col} />
            <DataTable data={this.state.dataMap} header={this.state.cols}/>
          </div>
        );
  }}
}

export default FileDetails;