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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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
      this.state = {col_x: "", col_y: ""};
      if (this.props.file){
        this.state = {
          doc_id : this.props.file
         };
      }
      this.loadFile = this.loadFile.bind(this);
    }
  

    async componentDidMount() {
      this.loadFile();
      }


    async loadFile()
    {
        let doc_id = this.state.doc_id
        const promise = await axios.get("http://localhost:8000/geo_file/"+doc_id)
        const status = promise.status;
        if(status===200)
        {
            const data = promise.data;
            this.setState({data:data.rows, lat_col: data.lat_col, lon_col: data.lon_col, cols: data.cols}); 
        }
    }
  
    handleRadioChange = event => {
      this.setState({algorithm : event.target.value})
      //this.props.update(event.target.name, event.target.value);
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
                <FormControlLabel value="meanshift" control={<Radio color="primary"/>} label="Mean Shift" />
                <FormControlLabel value="kmeans" control={<Radio color="primary"/>} label="K Means" />
            </RadioGroup>
  
           <hr />
           {this.state.algorithm == "kmeans" &&
           <div>
            <label>Set the K </label>
            <input type='number' className='form-control' name='max_distance' placeholder='Max distance'
                      onChange={this.handleInputChange} />
            </div>
           }
           {this.state.data &&
           <div>
             <div>
             <InputLabel id="demo-simple-select-filled-label">Column X</InputLabel>
              <Select name="col_x" value={this.state.col_x} onChange={this.onChange}>
                    {this.state.cols.map((col) => <MenuItem key={col} value={col}>{col}</MenuItem>)}
              </Select>
            </div>
            <div>
            <InputLabel id="demo-simple-select-filled-label">Column Y</InputLabel>
              <Select name="col_y" value={this.state.col_y} onChange={this.onChange}>
                    {this.state.cols.map((col) => <MenuItem key={col} value={col}>{col}</MenuItem>)}
              </Select>
            </div>
            </div>
           }

           
            <Stats step={2}  {...this.props} />
        </div>
    );
    }
  }


export default ClusterSettings;