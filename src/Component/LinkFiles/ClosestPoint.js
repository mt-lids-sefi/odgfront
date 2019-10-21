import { withStyles } from '@material-ui/core/styles';
import React,  { Component }  from 'react';
import axios from "axios";
import PropTypes from 'prop-types';
import StepWizard from 'react-step-wizard';
import Merge from '../Merge/Merge';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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
        files : this.props.location.mapProps.files 
      };
      this.loadFiles = this.loadFiles.bind(this);
    }

    async componentDidMount() {
      this.loadFiles();
    }

    async loadFiles()
    {
        let doc_ids = this.state.files
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
      const { classes } = this.props;
      if(this.state.files){
        return(
          <div className={classes.root}>
            <div className={'jumbotron'}>
                    <StepWizard>
                      <PreviewFiles />
                      <PreviewLinkedDataSet />
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
    render(){
      return (     
           <div>
            <Typography variant="h5" id="tableTitle"> Files preview & settings </Typography>
            <label>First Name</label>
            <input type='text' className='form-control' name='firstname' placeholder='First Name'
                onChange={this.update} />
            <Stats step={1} {...this.props} />
        </div>
    );
    }
}


class PreviewLinkedDataSet extends Component {
  render(){
    return (
      <div>
          <h3 className='text-center'>Prev linked!</h3>

          <label>Acá veremos el preview del archivo linkeado</label>
          
          <Stats step={2} {...this.props} />
      </div>
  );
  }
}

class SaveOptions extends Component {
  render(){
    return (
      <div>
          <h3 className='text-center'>Save options</h3>

          <label>Opciones de guardado</label>
          
          <Stats step={3} {...this.props} />
      </div>
  );
  }
}


ClosestPoints.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClosestPoints);