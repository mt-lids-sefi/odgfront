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
import FormControl from '@material-ui/core/FormControl';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
});


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
  class ClusterPreview extends Component {

    constructor(props) {
      super(props);
      this.state = {};
      if (this.props.file){
        this.state = {doc_id : this.props.file};
      }
      this.loadPreview = this.loadPreview.bind(this);
    }
  

    async componentDidMount() {
      this.loadPreview();
      }


    async loadPreview()
    {
        console.log("paso")
        console.log(this.props.form.algorithm)
        let doc_id = this.state.doc_id
        if (this.props.form.algorithm == 'kmeans'){
            let k=""
            if(this.state.k != null ){
                k="/"+this.state.k
            }
            const promise = await axios.get("http://localhost:8000/kmeans/"+doc_id+"/"+this.state.col_x+"/"+this.state.col_y+k)
            const status = promise.status;
            if(status===200)
            {
                const data = promise.data;
                this.setState({results:data.results}); 
                
            }
        }
        else if (this.props.form.algorithm == 'meanshift'){
            const promise = await axios.get("http://localhost:8000/clusterize_meanshift_preview/"+doc_id+"/"+this.state.col_x+"/"+this.state.col_y)
            const status = promise.status;
            if(status===200)
            {
                const data = promise.data;
                this.setState({results:data.results}); 
                console.log(data)
            }
        }
        
    }
  
    

    render(){
      const { classes } = this.props;
      return (
        <div>
           <Typography variant="h5" id="tableTitle"> Preview</Typography>
                  
      

           
            <Stats step={3}  {...this.props} />
        </div>
    );
    }
  }


ClusterPreview.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ClusterPreview);
