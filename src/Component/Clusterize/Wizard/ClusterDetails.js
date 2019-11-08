import React,  { Component }  from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Cylon from '../../LoadingComponents/Cylon';
import FileDetails from '../../FileDetails/FileDetails';


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
   
class ClusterDetails extends Component {
 
  constructor(props) {
    super(props);
    this.state = {};
  }


  update = (prop, value) => {
    this.props.update(prop, value);
  }
  

    render(){
      if (!this.props.file){
        return <Cylon/>
      }
      else {
      return (     
           <div>
            <div >
            <Typography variant="h5" id="tableTitle"> File preview & settings </Typography>
            </div>    
              <FileDetails file={this.props.file} />
            <Stats step={1} {...this.props} />
        </div>
        );
      }
    }
}


export default ClusterDetails;