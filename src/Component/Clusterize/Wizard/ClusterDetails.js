import React,  { Component }  from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Cylon from '../../LoadingComponents/Cylon';
import FileDetails from '../../FileDetails/FileDetails';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: { 
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  }
});


const Stats = ({
    currentStep,
    firstStep,
    goToStep,
    lastStep,
    nextStep,
    previousStep,
    totalSteps,
    step,
    
  }) => (
    
    <div>
        <hr />
        { step > 1 &&
         <Button variant="contained"  onClick={previousStep}> Atrás </Button>
        } 
        { step < totalSteps ?
            <Button variant="contained"  onClick={nextStep}> Continuar </Button>
            :
            <Button variant="contained"  onClick={nextStep}>  Finalizar </Button>
        }
        <hr/>  
    </div>
  );
   
class ClusterDetails extends Component {
 
  constructor(props) {
    super(props);
    this.state = {};
  }


  update = (prop, value) => {
    this.props.update(prop, value);
  }
  

    render(){
      const { classes } = this.props;
      if (!this.props.file){
        return <Cylon/>
      }
      else {
      return (     
           <div>
              <Paper className={classes.paper}>
            <div >
            <Typography variant="h4" id="tableTitle" align="left"> Clusterizar - Previsualización de conjuntos de datos y configuración</Typography>
            </div>    
              <FileDetails file={this.props.file} />
            <Stats step={1} {...this.props} />
            </Paper>
        </div>
        );
      }
    }
}



ClusterDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClusterDetails);