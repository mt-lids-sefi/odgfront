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
            <Button variant="contained"  onClick={nextStep}> Continue </Button>
            :
            <Button variant="contained"  onClick={nextStep}>  Finish </Button>
        }
        <hr/>  
    </div>
  );



class ClosestPointSettings extends Component {

    constructor(props) {
      super(props);
      this.state = {available_preview: true, filebase: 'fileA', distance: false}
    }
  
    handleChange = event => {
      this.setState({distance : event.target.checked, loaded : false})
      this.props.update(event.target.name, event.target.checked);
      if (event.target.checked){
        this.setState({available_preview: false})
      }
    };
  
    handleRadioChange = event => {
      this.setState({filebase : event.target.value, loaded : false})
      this.props.update(event.target.name, event.target.value);
    }
  
    handleInputChange = event => {
      this.setState({max_distance : event.target.value, loaded : false})
      this.props.update(event.target.name, event.target.value);
      if (event.target.value == ''){
        this.setState({available_preview: false})
      }
      else {
        this.setState({available_preview: true})
      }
    }
  
    preview = async () => {
      this.setState({loading: true})
      if(this.state.filebase == "fileA"){
        this.state.fileA = this.props.form.files[0]
        this.state.fileB = this.props.form.files[1]
      }
      else if(this.state.filebase == "fileB"){
        this.state.fileA = this.props.form.files[1]
        this.state.fileB = this.props.form.files[0]
      }
  
      if (this.state.distance){
       let promise = await axios.get("http://localhost:8000/link_closest_point_filter_preview/"
                                                  +this.state.fileA+"/"+this.state.fileB+"/"+this.props.form.max_distance)
        let status = promise.status;
        if(status===200)
        {
            const data = promise.data;
            this.setState({linked:data, loaded: true, loading:false})
        }
      }
      else{
        let promise = await axios.get("http://localhost:8000/link_closest_point_preview/"+this.state.fileA+"/"+this.state.fileB)
        let status = promise.status;
        if(status===200)
        {
            const data = promise.data;
            this.setState({linked:data, loaded: true, loading:false})
        }
      }    
  
    }
  
    render(){
      return (
        <div>
           <Typography variant="h5" id="tableTitle"> Settings</Typography>
           <label>Select the base file </label>
           
            <RadioGroup aria-label="gender" name="filebase" value={this.state.filebase} onChange={this.handleRadioChange}>
            {this.props.form.data_fileA && <FormControlLabel value="fileA" control={<Radio color="primary"/>} label={this.props.form.data_fileA.name} />}
            {this.props.form.data_fileB && <FormControlLabel value="fileB" control={<Radio color="primary"/>} label={this.props.form.data_fileB.name} />}
            </RadioGroup>
  
           <hr />
           <label>Get the closest point by distance </label>
          
           <Checkbox name='distance' checked={this.state.distance} 
                      onChange={this.handleChange} value={this.state.distance} color="primary" />
  
           
           {this.state.distance &&
              <div>
                 <label>Max distance </label>
                  <input type='number' className='form-control' name='max_distance' placeholder='Max distance'
                      onChange={this.handleInputChange} />
              </div>
            }
  
          <Button variant="contained"  onClick={this.preview} disabled={!this.state.available_preview}>  Preview </Button>
            {this.state.loading ? <Cylon/>
               : this.state.loaded && <DataTable data={this.state.linked.data} header={this.state.linked.cols} />}
            
            <Stats step={2} {...this.props} />
        </div>
    );
    }
  }


export default ClosestPointSettings;