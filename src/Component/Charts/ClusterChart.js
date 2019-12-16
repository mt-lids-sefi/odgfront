import React,  { Component }  from 'react';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import Cylon from '../../LoadingComponents/Cylon';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from Recharts;


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
            centroids: this.props.centroids, 
            labels: this.props.labels, 
            data: this.props.data, 
            col_x: this.props.col_x,
            col_y: this.props.col_y
        };
      }

    render(){
        const { classes } = this.props;
        if (this.state.data == null){
            return ( <Cylon />)
        }
        else {
            return(
                <ScatterChart width={400} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
                    <CartesianGrid />
                    <XAxis dataKey={'x'} type="number" name={this.state.col_x} />
                    <YAxis dataKey={'y'} type="number" name={this.state.col_y} />
                    <Scatter name='A school' data={this.state.data} fill='#8884d8'/>
                    <Tooltip cursor={{strokeDasharray: '3 3'}}/>
                </ScatterChart>
            )
        }
    }
}


ClusterChart.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ClusterChart);

