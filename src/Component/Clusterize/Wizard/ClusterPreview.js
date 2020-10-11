import React,  { Component }  from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Cylon from '../../LoadingComponents/Cylon';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
         <Button variant="contained"  onClick={previousStep}>  Atrás</Button>
        } 
        { step < totalSteps ?
            <Button variant="contained" onClick={nextStep}> Continuar </Button>
            :
            <Button variant="contained"  onClick={nextStep}>  Finalizar </Button>
        }
        <hr/>  
    </div>
  );
  class ClusterPreview extends Component {

    constructor(props) {
      super(props);
      this.state = {};
      if (this.props.file){
        this.state = {doc_id : this.props.file};
      }
    }
  

 
  
    

    render(){
      const { classes } = this.props;
      return (
        <div>
           <Typography variant="h5" id="tableTitle">Previsualización</Typography>
                  
      

           
            <Stats step={3}  {...this.props} />
        </div>
    );
    }
  }


ClusterPreview.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ClusterPreview);