import React,  { Component }  from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataTable from '../../DataTable/DataTable'
import Cylon from '../../LoadingComponents/Cylon';


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
    this.state = {doc_ids: this.props.files};
  }


  update = (prop, value) => {
    this.props.update(prop, value);
  }
  
  async loadFiles()
  {
      let doc_ids = this.props.files
      let promise = await axios.get("http://localhost:8000/geo_file/"+doc_ids[0])
      let status = promise.status;
      if(status===200)
      {
          const data = promise.data;
          this.setState({dataMapA:data})
      }
      promise = await axios.get("http://localhost:8000/geo_file/"+doc_ids[1])
      status = promise.status;
      if(status===200)
      {
          const data = promise.data;
          this.setState({dataMapB:data})
      }
      this.props.update('data_fileA', this.state.dataMapA)
      this.props.update('data_fileB', this.state.dataMapB)

  }
    render(){
      if (this.state.dataMapA == null || this.state.dataMapB == null){
        return <Cylon/>
      }
      else {
      return (     
           <div>
            <Typography variant="h5" id="tableTitle"> Files preview & settings </Typography>
            
          
                <DataTable data={this.state.dataMapA.rows} header={this.state.dataMapA.cols}/>
             
                <DataTable data={this.state.dataMapB.rows} header={this.state.dataMapB.cols}/>
             
          
            <Stats step={1} {...this.props} />
        </div>
        );
      }
    }
}


export default RulesSetting;