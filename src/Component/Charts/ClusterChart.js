import React,  { Component }  from 'react';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Cylon from '../../Component/LoadingComponents/Cylon';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Cell, Legend, LineChart, Line, Label} from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const colors = scaleOrdinal(schemeCategory10).range();

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

  

class ClusterChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data, 
            col_x: this.props.col_x,
            col_y: this.props.col_y,
            centroids: this.props.centroids,
            cluster_size: this.props.cluster_size
        };
      }

    makeScatter(clusterData){
      let c = colors[clusterData[0]["cluster"] % colors.length]
      let name = "Cluster "+clusterData[0]["cluster"]
      let scat = <Scatter name={name} data={clusterData} fill={c}>
                    {
                      clusterData.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[entry["cluster"] % colors.length]} />)
                    }
                  </Scatter>
      return scat
    }

    getScatters(){
      let chart_data = []
      let scatters = []
      for (let i = 0; i < this.state.cluster_size; i++){
        chart_data.push(i)
        chart_data[i] = []
      }
      for (let i = 0; i < Object.keys(this.state.data).length; i++){
        let cluster = this.state.data[i]["cluster"]
        let current = {"x" : this.state.data[i][this.state.col_x+"_cat"], "y" : this.state.data[i][this.state.col_y+"_cat"], "cluster": this.state.data[i]["cluster"]}
        chart_data[cluster].push(current)
      }
      for (let i = 0; i < chart_data.length; i++){
        let s = this.makeScatter(chart_data[i])
        scatters.push(s)
      }
      return scatters
    }

    getCentroids(){
      let centroids = []
      for (let i = 0; i < Object.keys(this.state.centroids).length; i++){
        let current = {"x" : this.state.centroids[i][0], "y" : this.state.centroids[i][1]}
        centroids.push(current)
      }
      return centroids
    }

    render(){
        const { classes } = this.props;
        if (this.state.data == null){
            return ( <Cylon />)
        }
        else {
          let scatters = this.getScatters()
          let centroids = this.getCentroids()
            return(
                <ScatterChart
                  width={400}
                  height={400}
                  margin={{
                    top: 20, right: 20, bottom: 20, left: 20,
                  }}
                  >
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis type="number" dataKey="x" name={this.state.col_x}> 
                    <Label value={this.state.col_x} offset={0} position="insideBottomRight" />  
                  </XAxis>
                  <YAxis type="number" dataKey="y" name={this.state.col_y}>
                    <Label value={this.state.col_y} offset={0} position="insideTopLeft" />
                  </YAxis>
                  <Legend />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  {scatters}
                  <Scatter name="Centroids" data={centroids} fill="#FF4B25">
                    {
                      centroids.map((entry, index) => <Cell key={`cell-${index}`} fill="#FF4B25" />)
                    }
                  </Scatter>
                </ScatterChart>
            )
        }
    }
}


ClusterChart.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ClusterChart);
