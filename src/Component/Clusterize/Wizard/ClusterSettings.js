import React,  { Component }  from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataTable from '../../DataTable/DataTable'
import Cylon from '../../LoadingComponents/Cylon';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



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
            <Button variant="contained" onClick={nextStep}> Continue </Button>
            :
            <Button variant="contained"  onClick={nextStep}>  Finish </Button>
        }
        <hr/>  
    </div>
  );



class ClusterSettings extends Component {

    constructor(props) {
      super(props);
      this.state = {};
    }
  

  
    handleRadioChange = event => {
      this.setState({algorithm : event.target.value})
      this.props.update(event.target.name, event.target.value);
    }

    preview = async () => {
      this.setState({loading: true})
      
  
    }
  
    render(){
      return (
        <div>
           <Typography variant="h5" id="tableTitle"> Settings</Typography>
           <label>Select the cluster algorithm </label>
           
            <RadioGroup aria-label="gender" name="algorithm" value={this.state.algorithm} onChange={this.handleRadioChange}>
                <FormControlLabel value="meanshift" control={<Radio color="primary"/>} label="Mean Shift" />}
                <FormControlLabel value="kmeans" control={<Radio color="primary"/>} label="K Means" />}
            </RadioGroup>
  
           <hr />
           {this.state.algorithm == "kmeans" &&
           <div>
            <label>Set the K </label>
            <input type='number' className='form-control' name='max_distance' placeholder='Max distance'
                      onChange={this.handleInputChange} />
            </div>
           }
           
            <Stats step={2}  {...this.props} />
        </div>
    );
    }
  }


export default ClusterSettings;