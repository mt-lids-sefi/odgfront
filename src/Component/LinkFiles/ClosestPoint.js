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
        form: {},
        files: [1,2]
        //files : this.props.location.mapProps.files 
      };
    }

    updateForm = (key, value) => {
        const { form } = this.state;

        form[key] = value;
        this.setState({ form });
    }


    render(){
      const { classes } = this.props;
      if(this.state.files){
        return(
          <div className={classes.root}>
            <div className={'jumbotron'}>
                    <StepWizard>
                      <PreviewFiles files={this.state.files} />
                      <Settings update={this.updateForm}/>
                      <PreviewLinkedDataSet  form={this.state.form}/>
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
    this.state = {distance: false, filebase: 'fileA'}
  }

 

  handleChange = event => {
    this.setState({distance : event.target.checked})
  };

  handleRadioChange = event => {
    this.setState({filebase :  event.target.value})
  }

  render(){
    return (
      <div>
         <Typography variant="h5" id="tableTitle"> Settings</Typography>
         <label>Select the base file </label>
         
          <RadioGroup aria-label="gender" name="base" value={this.state.filebase} onChange={this.handleRadioChange}>
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
                    onChange={this.update} />
            </div>
          }

       
          <Stats step={2} {...this.props} />
      </div>
  );
  }
}



class PreviewLinkedDataSet extends Component {


  render(){
    return (
      <div>
         <Typography variant="h5" id="tableTitle"> Prev linked</Typography>

          <label>Acá veremos si llegan los parámetros: { this.props.form.distance && <h3>Hey {this.props.form.firstname}! 👋</h3> }</label>
          
          <Stats step={3} {...this.props} />
      </div>
  );
  }
}

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