import { withStyles } from '@material-ui/core/styles';
import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import Cylon from '../LoadingComponents/Cylon';

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

class DetailsCard extends Component {
}

DetailsCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(DetailsCard);