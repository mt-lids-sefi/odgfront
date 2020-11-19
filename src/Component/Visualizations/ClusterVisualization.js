import React,  { Component }  from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Cylon from '../LoadingComponents/Cylon';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ClusteredMap from '../Maps/ClusteredMap';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import ClusterChart from '../Charts/ClusterChart';
import Table from '../DataTable/Table'
import { Redirect } from 'react-router-dom'

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


class ClusterVisualization extends Component {

    constructor(props) {
      super(props);
      this.state = {};
      if (this.props.location.mapProps){
        this.state = {doc_id :this.props.location.mapProps.doc_id, col_a: '', col_b: '', algorithm: '', data: [], loaded: false};
      }
      this.loadC12 = this.loadC12.bind(this);
    }
  

    async componentDidMount() {
      this.loadC12();
    }

    async loadC12()
    {
        let doc_id = this.state.doc_id
        const promise = await axios.get("http://localhost:8000/clusterization/"+doc_id)
        const status = promise.status;
        if(status===200)
        {
            const data = promise.data;
            this.setState({data:data.data, col_a: data.col_a, col_b: data.col_b, cols: data.cols, strategy: data.strategy,
                            centroids: data.centroids, labels: data.labels, lat: data.lat, lon: data.lon, cats:data.cats,
                            name: data.name, description: data.description, cluster_size: data.cluster_size, loaded: true});
        }
        if(Object.keys(this.state.cats["x"]).length != 0){
            this.setState({categorize_x: true})
        }
        if(Object.keys(this.state.cats["y"]).length != 0){
            this.setState({categorize_y: true})
        }
    }
  
   
    showCentroids(){
      let centroids = [] 
      for (let i = 0; i < this.state.centroids.length; i++){
        centroids.push({x: this.state.centroids[i][0], y: this.state.centroids[i][1]})
      }
      let tab = <Table data={centroids}  header={['x', 'y']}/>
      return tab
    }

render(){
    const { classes } = this.props;
    if (this.state.doc_id == null){
      return <Redirect to={{pathname: '/configurations'}} />
    }
    if(!this.state.loaded){
        return  <Cylon/>
    }
    else { 
    
        return (
        <div>
            <Paper className={classes.paper}>
            <div > 
            <Typography variant="h4" id="tableTitle" align="left" > Visualización </Typography>
            
            </div>    
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h6" id="tableTitle" align="left" > Mapa </Typography>
                <Typography variant="subtitle1" id="tableTitle" align="left" > Información dividida en clusters por colores </Typography>
                <ClusteredMap lat_col={this.state.lat} lon_col={this.state.lon} cluster_size={this.state.cluster_size} 
                        clustered_data={this.state.data} col_x={this.state.col_a} col_y={this.state.col_b}/> 
                <Typography variant="h6" id="tableTitle" align="left" > Conjunto de datos </Typography>
                <Table data={this.state.data}  header={this.state.cols}/>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" id="tableTitle" align="left" > Gráfico puntos clusterizados </Typography>
                <ClusterChart cluster_size={this.state.cluster_size} data={this.state.data} col_x={this.state.col_a} col_y={this.state.col_b} centroids={this.state.centroids} />
              </Grid>
              {this.state.centroids != null && 
              <Grid item xs={6}>
                      <Typography variant="h6" id="tableTitle" align="left" > Centroides </Typography>
                      {this.showCentroids()}
              </Grid>}
              <Grid item xs={6}>
              {this.state.categorize_x &&
                  <div>
                  <Typography variant="h6" id="tableTitle" align="left" > Categorización de {this.state.col_a} </Typography>
                  <Table data={this.state.cats["x"]} headersDesc={{"original": "Original", "categorized": "Categorización"}} header={["original", "categorized"]} />
                  </div> 
              }
              </Grid>
              <Grid item xs={6}>
              {this.state.categorize_y &&
                  <div>
                  <Typography variant="h6" id="tableTitle" align="left" > Categorización de {this.state.col_b} </Typography>
                  <Table data={this.state.cats["y"]} headersDesc={{"original": "Original", "categorized": "Categorización"}} header={["original", "categorized"]} />
                  </div>
              }
              </Grid>
            </Grid>
            </Paper>
        </div>
        );
    }
  }
}


  ClusterVisualization.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ClusterVisualization);
