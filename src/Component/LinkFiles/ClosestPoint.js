import { withStyles } from '@material-ui/core/styles';
import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import StepWizard from 'react-step-wizard';
import Merge from '../Merge/Merge';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PreviewFiles from './Wizard/PreviewFiles'
import ClosestPointSettings from './Wizard/ClosestPointSettings';
import SaveClosestOptions from './Wizard/SaveClosestOptions'
import { Redirect } from 'react-router-dom';

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



class ClosestPoints extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        form: {files: this.props.location.mapProps.files , distance:false, filebase:'fileA', saved: false},
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
                      <ClosestPointSettings update={this.updateForm}  form={this.state.form}/>
                      <SaveClosestOptions update={this.updateForm} form={this.state.form}/>
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
         <Button variant="contained"  onClick={previousStep}>  Atrás </Button>
        } 
        { step < totalSteps ?
            <Button variant="contained"  onClick={nextStep}> Continuar </Button>
            :
            <Button variant="contained"  onClick={nextStep}>  Finalizar </Button>
        }
        <hr/>   
  </div>
);


ClosestPoints.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClosestPoints);


/**para actualizar x fuera:
 * 
 * 
 * en el componente que sale: 
update={this.updateForm}
 *  update = (e) => {
    this.props.update(e.target.name, e.target.value);
  }
 * 

 <label>First Name</label>
                <input type='text' className='form-control' name='firstname' placeholder='First Name'
                    onChange={this.update} />


    en el componente que recibe:
    <PreviewLinkedDataSet  form={this.state.form}/>
    { this.props.form.distance && <h3>Hey {this.props.form.firstname}!
 */


