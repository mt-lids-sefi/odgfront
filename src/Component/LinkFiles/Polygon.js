import { withStyles } from '@material-ui/core/styles';
import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import StepWizard from 'react-step-wizard';
import Button from '@material-ui/core/Button';
import PreviewFiles from './Wizard/PreviewFiles'
import PolygonSettings from './Wizard/PolygonSettings'
import SavePolygonOptions from './Wizard/SavePolygonOptions'


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



class Polygon extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        form: {files: this.props.location.mapProps.files , distance:false,  saved: false},
        files: this.props.location.mapProps.files 
      };
    }

    updateForm = (key, value) => {
        const { form } = this.state;

        form[key] = value;
        this.setState({ form });
    }


    render(){
      const { classes } = this.props;
        return(
          <div className={classes.root}>
            <div className={'jumbotron'}>
                    <StepWizard>
                      <PreviewFiles files={this.state.files} update={this.updateForm}/>
                      <PolygonSettings update={this.updateForm}  form={this.state.form}/>
                      <SavePolygonOptions update={this.updateForm} form={this.state.form}/>
                    </StepWizard>
                </div>
              
          </div>
          );
      }
    }



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
       <Button variant="contained"  onClick={previousStep}>  Go back </Button>
      } 
      { step < totalSteps ?
          <Button variant="contained"  onClick={nextStep}> Continue </Button>
          :
          <Button variant="contained"  onClick={nextStep}>  Finish </Button>
      }
      <hr/>  
  </div>
);


Polygon.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Polygon);
