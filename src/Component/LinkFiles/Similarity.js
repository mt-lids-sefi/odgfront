import { withStyles } from '@material-ui/core/styles';
import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import StepWizard from 'react-step-wizard';
import Button from '@material-ui/core/Button';
import PreviewFiles from './Wizard/PreviewFiles'
import { Redirect } from 'react-router-dom';
import RulesSetting from './Wizard/RulesSetting';
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
         <Button variant="contained"  onClick={previousStep}> Atrás</Button>
        } 
        { step < totalSteps ?
            <Button variant="contained"  onClick={nextStep}> Continuar </Button>
            :
            <Button variant="contained"  onClick={nextStep}>  Finalizar </Button>
        }
        <hr/>  
    </div>
  );

class Similarity extends Component {
    
    constructor(props) {
      super(props);
      if(this.props.location.mapProps){
        this.state = {
          files: this.props.location.mapProps.files,
          form: {files: this.props.location.mapProps.files, saved: false},
        };
      }
      else{
        this.state  = {
          return : true
        }
      }
    }

    updateForm = (key, value) => {
        const { form } = this.state;

        form[key] = value;
        this.setState({ form });
    } 


    render(){
      const { classes } = this.props;
      if (this.state.return){
        return <Redirect to={{pathname: '/merge'}} />
      }
      else {
        return(
          <div className={classes.root}>
              <div className={'jumbotron'}>
                  <StepWizard>
                      <PreviewFiles files={this.state.files} update={this.updateForm}/>
                      <RulesSetting update={this.updateForm}  form={this.state.form}/>
                  </StepWizard>
              </div>
          </div>
        );
      }
    }
}

Similarity.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(Similarity);
