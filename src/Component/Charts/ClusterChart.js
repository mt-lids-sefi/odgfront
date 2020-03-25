import React,  { Component }  from 'react';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Cylon from '../../Component/LoadingComponents/Cylon';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Cell, Legend, LineChart, Line} from 'recharts';
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
            //centroids: this.props.centroids, 
            //labels: this.props.labels, 
            data: this.props.data, 
            col_x: this.props.col_x,
            col_y: this.props.col_y,
            centroids: this.props.centroids
        };
      }

    render(){
        const { classes } = this.props;
        
        if (this.state.data == null){
            return ( <Cylon />)
        }
        else {
          let chart_data = []
          let centroids = []
          for (let i = 0; i < Object.keys(this.state.data).length; i++){
            let current = {"x" : this.state.data[i][this.state.col_x], "y" : this.state.data[i][this.state.col_y], "cluster": this.state.data[i]["cluster"]}
            chart_data.push(current)
          }
          for (let i = 0; i < Object.keys(this.state.centroids).length; i++){
            let current = {"x" : this.state.centroids[i][0], "y" : this.state.centroids[i][1]}
            centroids.push(current)
          }
          console.log(centroids)
          console.log(this.state.centroids)
            return(
                <ScatterChart
                  width={400}
                  height={400}
                  margin={{
                    top: 20, right: 20, bottom: 20, left: 20,
                  }}
                  >
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name={this.state.col_x}  />
                  <YAxis type="number" dataKey="y" name={this.state.col_y}  />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="A school" data={chart_data} fill="#8884d8">
                    {
                      chart_data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[entry["cluster"] % colors.length]} />)
                    }
                  </Scatter>
                  <Scatter name="A school" data={centroids} fill="#8884d8">
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

