import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as  Route, Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Cylon from '../LoadingComponents/Cylon';
import Table from './../DataTable/Table'




const styles = theme => ({
  root: {
      width: '100%',
      marginTop: theme.spacing(3),
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

class DataFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
     files:[],
    };
    this.loadFiles = this.loadFiles.bind(this);
  }
 


  componentWillMount() {
    this.loadFiles();
  }

  async loadFiles()
  {
    const promise = await axios.get("http://localhost:8000/datafiles");
    const status = promise.status;
    if(status===200)
    {
      const data = promise.data;
      this.setState({files:data});
    }
  }

  render() {
    if (this.state.files == []) {
      return <Cylon/>
    }
    else{
      let headers = ['name', 'description']
      let linkColumns = [{"name": "Details", "url": "//datafile_details"}]
      const { classes } = this.props;
      return(
        <div className={classes.root}>
          <Paper >
            <Table data={this.state.files} header={headers} links={linkColumns} title={"Data Files"} />
          </Paper>
        </div>
      )
    }
  }
}


DataFiles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataFiles);