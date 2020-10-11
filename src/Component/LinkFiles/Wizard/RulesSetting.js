import React,  { Component }  from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '../../DataTable/Table'
import Cylon from '../../LoadingComponents/Cylon';
import Popup from "reactjs-popup";
import RulesCreation from './RulesCreation';


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
   
class RulesSetting extends Component {
 
  constructor(props) {
    super(props);
    this.state = {rules: [], header:["N", "Column A", "Column B", "Matches"]}
  }


  update = (prop, value) => {
    this.props.update(prop, value);
  }
  

    render(){
      
      return (     
           <div>
            <Typography variant="h5" id="tableTitle"> Rules </Typography>
            <Table data={this.state.rules} header={this.state.header}/>

             <Popup trigger={<button> Trigger</button>} position="right center"  
                    modal
                    closeOnDocumentClick>
              <div><RulesCreation fileA={this.props.form.data_fileA} fileB={this.props.form.data_fileB} /></div>
            </Popup>

            <Stats step={2} {...this.props} />
        </div>
        );
      
    }
}


export default RulesSetting;