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
import ClusteredMap from '../../Maps/ClusteredMap';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import FileDetails from '../../FileDetails/FileDetails';
import ClusterChart from '../../Charts/ClusterChart';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: { 
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  root: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  }
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



class ClusterSettings extends Component {

    constructor(props) {
      super(props);
      this.state = {};
      if (this.props.file){
        this.state = {doc_id : this.props.file, col_x: '', col_y: '', algorithm: 'meanshift', 
        available_preview: true, loading: false, k: ''};
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
            this.setState({data:data.rows, lat_col: data.lat_col, lon_col: data.lon_col, cols: data.cols, col_x: data.cols[0], col_y: data.cols[0]});
        }
    }
  
    handleRadioChange = event => {
      this.setState({algorithm : event.target.value})
      this.props.update(event.target.name, event.target.value);
      if (event.target.value == 'kmeans' && this.state.k == ''){
        this.setState({available_preview: false})
      }
      if (event.target.value == 'kmeans' && this.state.k != ''){
        this.setState({available_preview: true})
      }
      if (event.target.value == 'meanshift'){
        this.setState({available_preview: true})
      }
      
    }

    handleInputChange = event => {
      this.setState({k : event.target.value})
      //this.props.update(event.target.name, event.target.value);
      if (event.target.value == ''){
        this.setState({available_preview: false})
      }
      else{
        this.setState({available_preview: true})
      }
    }

    onChangeX = event => {
      this.setState({col_x : event.target.value})
      //this.props.update(event.target.name, event.target.value);
    }
    onChangeY = event => {
      this.setState({col_y : event.target.value})
      //this.props.update(event.target.name, event.target.value);
    }

    preview = async () => {
        this.setState({loading: true})
      
       if (this.props.form.algorithm == 'kmeans'){
          let k=""
          if(this.state.k != null ){
              k="/"+this.state.k
          }
          const promise = await axios.get("http://localhost:8000/clusterize_kmeans_preview/"+this.state.doc_id+"/"+this.state.col_x+"/"+this.state.col_y+k)
          let status = promise.status;
          if(status===200)
          {
              const data = promise.data;
              this.setState({centroids:data.centroids, labels: data.labels, clustered_data: data.data, cluster_size: data.cluster_size, loaded: true, loading:false})
          }
        }
        else if (this.props.form.algorithm == 'meanshift'){
          const promise = await axios.get("http://localhost:8000/clusterize_meanshift_preview/"+this.state.doc_id+"/"+this.state.col_x+"/"+this.state.col_y)
          let status = promise.status;
          if(status===200)
          {
              const data = promise.data;
              this.setState({centroids:data.centroids, labels: data.labels, clustered_data: data.data, cluster_size: data.cluster_size, loaded: true, loading:false})
          }
      }

        
    }

    render(){
      const { classes } = this.props;
      return (
        <div>
         <Paper className={classes.paper}>
         <div > 
            <Typography variant="h6" id="tableTitle" align="left" > Settings </Typography>
            
            </div>    
          <Grid container spacing={3}>
            <Grid item xs={6}>
             

                <label>Select the cluster algorithm </label>

                <RadioGroup aria-label="gender" name="algorithm" value={this.state.algorithm} onChange={this.handleRadioChange}>
                  <FormControlLabel value="meanshift" control={<Radio color="primary"/>} label="Mean Shift" />
                  <FormControlLabel value="kmeans" control={<Radio color="primary"/>} label="K Means" />
                </RadioGroup>

              
                {this.state.algorithm == "kmeans" &&
                <div>
                <label>Set the K </label>
                <input type='number' className='form-control' name='max_distance' placeholder='K'
                  onChange={this.handleInputChange} />
                </div>
                }
                <hr />
                {this.state.data  &&

                <div>
                  <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-filled-label">Column X</InputLabel>
                      <Select name="col_x" value={this.state.col_x} onChange={this.onChangeX}>
                        {this.state.cols.map((col) => <MenuItem key={col} value={col}>{col}</MenuItem>)}
                      </Select>
                    </FormControl>
                    </div>
                    <hr />
                    <div>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-filled-label">Column Y</InputLabel>
                      <Select name="col_y" value={this.state.col_y} onChange={this.onChangeY}>
                        {this.state.cols.map((col) => <MenuItem key={col} value={col}>{col}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </div>
                </div>
                }

                <Button variant="contained"  onClick={this.preview} disabled={!this.state.available_preview}>  Preview </Button>
             
            </Grid>
            {this.state.loading ? <Cylon/> : this.state.loaded && 
            <Grid item xs={6}>
              
              <ClusteredMap lat_col={this.state.lat_col} lon_col={this.state.lon_col} cluster_size={this.state.cluster_size} 
                      clustered_data={this.state.clustered_data} col_x={this.state.col_x} col_y={this.state.col_y}/> 
              <ClusterChart col_x={this.state.col_x} col_y={this.state.col_y}  />
            </Grid>
            }

          </Grid>
          <Stats step={2}  {...this.props} />
          </Paper>
        </div>
      );
    }
  }


ClusterSettings.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ClusterSettings);
