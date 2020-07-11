import React, { Component } from 'react';
import axios from "axios";
import 'react-leaflet-markercluster/dist/styles.min.css';
import DataTable from '../DataTable/DataTable'
import Cylon from "../LoadingComponents/Cylon"
import SimpleMap from '../Maps/SimpleMap';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import { Redirect } from 'react-router-dom'
import DetailsCard from './DetailsCard';

const styles = theme => ({
  root: {
    flexGrow: 1
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

class FileDetails extends Component {
    constructor(props) {
            super(props);
            console.log(props)
            if (this.props.location.mapProps.doc_id) {
              this.state  = {
                return : true
              }
            }
            if (this.props.location){
              this.state = {
                doc_id : this.props.location.mapProps.doc_id
               };
            }
            else if (this.props.file){
              this.state = {
                doc_id : this.props.file
               };
            }
            else {
              this.state  = {
                return : true
              }
            }
            this.loadFile = this.loadFile.bind(this);
        }

    async componentDidMount() {
        this.loadFile();
        }


    async loadFile()
    {
        let doc_id = this.state.doc_id
        const promise = await axios.get("http://localhost:8000/geo_file/"+doc_id)
        const status = promise.status;
        if(status===200)
        {
            const data = promise.data;
            this.setState({dataMap:data.rows, lat_col: data.lat_col, lon_col: data.lon_col, cols: data.cols}); 
        }
    }



  render() {
    const { classes } = this.props;
    if (this.state.return){
      return <Redirect to={{pathname: '/files'}} />
    }
    if (this.state.dataMap == null) {
      return <Cylon/>
    }
    else{
      return (
        <div className={classes.root}>
      
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <SimpleMap data={this.state.dataMap} lat_col={this.state.lat_col} lon_col={this.state.lon_col} /> 
          </Grid>
          <Grid item xs={6}>
            <DataTable data={this.state.dataMap} header={this.state.cols}/>
          </Grid>
          <Grid>
            <DetailsCard file_id={this.state.doc_id} />
          </Grid>
        </Grid>
    
      </div>
        );
  }}
}


FileDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

  
export default withStyles(styles)(FileDetails);