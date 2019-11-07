import { withStyles } from '@material-ui/core/styles';
import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import Cylon from '../LoadingComponents/Cylon';
import SimpleMap from '../Maps/SimpleMap'
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import DataTable from '../DataTable/DataTable'
import { Paper } from '@material-ui/core';

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
  

class Clusterizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
     //file_id : this.props.location.mapProps.file_id,
     file_id : 1,
     props : this.props
    };
    this.loadFile = this.loadFile.bind(this);
  }

  componentWillMount() {
    this.loadFile();
  }

  async loadFile()
    {
        let doc_id = this.state.file_id
        const promise = await axios.get("http://localhost:8000/map/"+doc_id)
        const status = promise.status;
        if(status===200)
        {
            const data = promise.data;
            this.setState({data:data.rows, lat_col: data.lat_col, lon_col: data.lon_col, cols: data.cols}); 
        }
    }


    render(){
      const { classes } = this.props;
      if (this.state.data == null){
        return ( <Cylon />)
      }
      else {
        return (
          <div className={classes.root}>
      
            <Grid container spacing={3}>
              <Grid item xs={6}>
              <Paper className={classes.paper}><SimpleMap data={this.state.data} lat_col={this.state.lat_col} lon_col={this.state.lon_col} /> </Paper>
              </Grid>
              <Grid item xs={6}>
              <Paper className={classes.paper}><DataTable data={this.state.data} header={this.state.cols}/></Paper>
              </Grid>
            </Grid>
        
          </div>
        );
      }
    }
}


Clusterizer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Clusterizer);
  