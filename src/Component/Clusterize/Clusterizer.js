import { withStyles } from '@material-ui/core/styles';
import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import Cylon from '../LoadingComponents/Cylon';
import StepWizard from 'react-step-wizard';
import FileDetails from '../FileDetails/FileDetails';
import ClusterDetails from './Wizard/ClusterDetails';
import ClusterSettings from './Wizard/ClusterSettings';

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
     file_id : this.props.location.mapProps.file_id,
     //file_id : 1,
     props : this.props
    };
  }



    render(){
      const { classes } = this.props;
      if (this.state.file_id == null){
        return ( <Cylon />)
      }
      else {
        return (
          <div className={classes.root}>
            <div className={'jumbotron'}>
              <StepWizard>  
                <ClusterDetails file={this.state.file_id} />
                <ClusterSettings file={this.state.file_id} />
              </StepWizard>
            </div>
          </div>
        );
      }
    }
}


Clusterizer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Clusterizer);
  