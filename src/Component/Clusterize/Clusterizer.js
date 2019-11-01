import { withStyles } from '@material-ui/core/styles';
import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import Cylon from '../LoadingComponents/Cylon';


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

    render(){
        return (<Cylon /> )
    }
}


Clusterizer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Clusterizer);
  