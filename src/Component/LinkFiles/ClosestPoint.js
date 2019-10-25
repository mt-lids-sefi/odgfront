import { withStyles } from '@material-ui/core/styles';
import React,  { Component }  from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import StepWizard from 'react-step-wizard';
import Merge from '../Merge/Merge';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DataTable from '../DataTable/DataTable'
import Cylon from '../LoadingComponents/Cylon';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



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
        form: {files: [36,37]},
        files: [36,37]
        //files: [1,2]
        //files : this.props.location.mapProps.files 
      };
    }

    updateForm = (key, value) => {
        const { form } = this.state;

        form[key] = value;
        this.setState({ form });
    }

    set_done(){
      this.setState({done_settings: true})
    }

    /** <PreviewLinkedDataSet  form={this.state.form}/> */
    render(){
      const { classes } = this.props;
      if(this.state.files){
        return(
          <div className={classes.root}>
            <div className={'jumbotron'}>
                    <StepWizard>
                      <PreviewFiles files={this.state.files} />
                      <Settings update={this.updateForm}  form={this.state.form}/>
                      

                      <SaveOptions />
                    </StepWizard>
                </div>
              
          </div>
          );
      }
      else {
        return ( <Merge />)
      }

    
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


class PreviewFiles extends Component {
 
  constructor(props) {
    super(props);
    this.state = {};
    this.loadFiles = this.loadFiles.bind(this);
  }
  async componentDidMount() {
    this.loadFiles();
  }

  async loadFiles()
  {
      let doc_ids = this.props.files
      console.log(doc_ids)
      let promise = await axios.get("http://localhost:8000/map/"+doc_ids[0])
      let status = promise.status;
      if(status===200)
      {
          const data = promise.data;
          this.setState({dataMapA:data})
      }
      promise = await axios.get("http://localhost:8000/map/"+doc_ids[1])
      status = promise.status;
      if(status===200)
      {
          const data = promise.data;
          this.setState({dataMapB:data})
      }
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

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  handleChange = event => {
    this.setState({distance : event.target.checked, loaded: false})
    this.props.update(event.target.name, event.target.checked);
  };

  handleRadioChange = event => {
    this.setState({filebase :  event.target.value, loaded: false})
    this.props.update(event.target.name, event.target.value);
  }

  handleInputChange = event => {
    this.setState({max_distance :  event.target.value, loaded: false})
    this.props.update(event.target.name, event.target.value);
  }

  preview = async () => {
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
          this.setState({linked:data, loaded: true})
      }
    }
    else{
      let promise = await axios.get("http://localhost:8000/link_closest_point_preview/"+this.state.fileA+"/"+this.state.fileB)
      let status = promise.status;
      if(status===200)
      {
          const data = promise.data;
          this.setState({linked:data, loaded: true})
      }
    }    

  }

  render(){
    return (
      <div>
         <Typography variant="h5" id="tableTitle"> Settings</Typography>
         <label>Select the base file </label>
         
          <RadioGroup aria-label="gender" name="filebase" value={this.state.filebase} onChange={this.handleRadioChange}>
            <FormControlLabel value="fileA" control={<Radio color="primary"/>} label="aRCHIV A" />
            <FormControlLabel value="fileB" control={<Radio color="primary"/>} label="aRCHIVO B" />
          </RadioGroup>

         <hr />
         <label>Get the closest point by distance </label>
        
         <Checkbox name='distance' checked={this.state.distance} 
                    onChange={this.handleChange} value={this.state.distance} color="primary" />

         
         {this.state.distance &&
            <div>
               <label>Max distance </label>
                <input type='text' className='form-control' name='max_distance' placeholder='Max distance'
                    onChange={this.handleInputChange} />
            </div>
          }

        <Button variant="contained"  onClick={this.preview}>  Preview </Button>
          {this.state.loaded && <DataTable data={this.state.linked.data} header={this.state.linked.cols} />}
          
          <Stats step={2} {...this.props} />
      </div>
  );
  }
}



/*class PreviewLinkedDataSet extends Component {

  constructor(props) {
    super(props);
    this.state = {distance: this.props.form.distance,
                  filebase: this.props.form.filebase};
    this.linkFiles = this.linkFiles.bind(this);
  }
  /*
  async componentDidMount() {
    if(this.props.filebase == "fileA"){
      this.state.fileA = this.props.form.files[0]
      this.state.fileB = this.props.form.files[1]
    }
    else if(this.props.filebase == "fileB"){
      this.state.fileA = this.props.form.files[1]
      this.state.fileB = this.props.form.files[0]
    }
    this.linkFiles();
  }*/
/*
  async linkFiles(){
    if(this.props.filebase == "fileA"){
      this.state.fileA = this.props.form.files[0]
      this.state.fileB = this.props.form.files[1]
    }
    else if(this.props.filebase == "fileB"){
      this.state.fileA = this.props.form.files[1]
      this.state.fileB = this.props.form.files[0]
    }

    if (this.props.form.distance){
     let promise = await axios.get("http://localhost:8000/link_closest_point_filter_preview/"
                                                +this.state.fileA+"/"+this.state.fileB+"/"+this.props.form.max_distance)
      let status = promise.status;
      if(status===200)
      {
          const data = promise.data;
          this.setState({linked:data})
      }
    }
    else{
      let promise = await axios.get("http://localhost:8000/link_closest_point_preview/"+this.state.fileA+"/"+this.state.fileB)
      let status = promise.status;
      if(status===200)
      {
          const data = promise.data;
          this.setState({linked:data})
      }
    }    
  }

  render(){
    if (this.state.linked == null){
      return <Cylon/>
    }
    else {
      return (
        <div>
          <Typography variant="h5" id="tableTitle"> Prev linked</Typography>
          <DataTable data={this.state.linked.data} header={this.state.linked.cols} />
            <Stats step={3} {...this.props} />
        </div>
      );
    }
  }
}*/

class SaveOptions extends Component {
  render(){
    return (
      <div>
          <Typography variant="h5" id="tableTitle"> Save options </Typography>

          <label>Opciones de guardado</label>
          
          <Stats step={4} {...this.props} />
      </div>
  );
  }
}


ClosestPoints.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClosestPoints);