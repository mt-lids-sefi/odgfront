import React,  { Component }  from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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


class SaveOptions extends Component {
    submit = () => {
        alert('You did it! Yay!') // eslint-disable-line
    }

    render(){
      return (
        <div>
            <Typography variant="h5" id="tableTitle"> Save options </Typography>
            <label>Name</label>
                  <input type='text' className='form-control' name='name' placeholder='Name'
                      onChange={this.update} />
            <label>Description</label>
                  <input type='text' className='form-control' name='description' placeholder='Description'
                      onChange={this.update} />
            <Stats step={4} {...this.props} nextStep={this.submit} />
        </div>
    );
    }
}

export default SaveOptions;