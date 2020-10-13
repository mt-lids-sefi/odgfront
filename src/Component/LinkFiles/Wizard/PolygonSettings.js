import React,  { Component }  from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '../../DataTable/Table'
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
    completed,
  }) => (
    
    <div>
        <hr />
        { step > 1 &&
         <Button variant="contained"  onClick={previousStep}>  Go back </Button>
        } 
        { step < totalSteps ?
            <Button variant="contained" disabled={!completed} onClick={nextStep}> Continue </Button>
            :
            <Button variant="contained"  onClick={nextStep}>  Finish </Button>
        }
        <hr/>  
    </div>
  );



class PolygonSettings extends Component {

    constructor(props) {
      super(props);
      this.state = {available_preview: false}
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
      
        this.state.fileA = this.props.form.files[0]
        this.state.fileB = this.props.form.files[1]
       let promise = await axios.get("http://localhost:8000/link_polygon_preview/"
                                                  +this.state.fileA+"/"+this.state.fileB+"/"+this.props.form.max_distance)
        let status = promise.status;
        if(status===200)
        {
            const data = promise.data;
            this.setState({linked:data, loaded: true, loading:false})
        }
    }
  
    render(){
      return (
        <div>
           <Typography variant="h5" id="tableTitle"> Settings</Typography>
    
         
              <div>
                 <label>Max distance </label>
                  <input type='number' className='form-control' name='max_distance' placeholder='Max distance'
                      onChange={this.handleInputChange} />
              </div>
            
  
          <Button variant="contained"  onClick={this.preview} disabled={!this.state.available_preview}>  Previsualizar </Button>
            {this.state.loading ? <Cylon/>
               : this.state.loaded && <Table data={this.state.linked.data} header={this.state.linked.cols} />}
            
            <Stats step={2} completed={this.state.available_preview} {...this.props} />
        </div>
    );
    }
  }


export default PolygonSettings;