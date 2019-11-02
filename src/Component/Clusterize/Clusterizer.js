import { withStyles } from '@material-ui/core/styles';
import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import Cylon from '../LoadingComponents/Cylon';
import SimpleMap from '../Maps/SimpleMap'
import axios from "axios";

const styles = theme => ({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3),
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
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
     file_id : this.props.location.mapProps.file_id,
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
      if (this.state.data == null){
        return ( <Cylon />)
      }
      else {
        return (<SimpleMap data={this.state.data} lat_col={this.state.lat_col} lon_col={this.state.lon_col} /> )
      }
    }
}


Clusterizer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Clusterizer);
  