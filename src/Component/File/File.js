import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as  Route, Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from './../DataTable/Table'
import Cylon from '../LoadingComponents/Cylon';

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

class File extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
    };
    this.loadFiles = this.loadFiles.bind(this);
  }

  componentDidMount() {
    this.loadFiles();
  }

  async loadFiles()
  {
    const promise = await axios.get("http://localhost:8000/geofiles");
    const status = promise.status;
    if(status===200)
    {
      const data = promise.data;
      this.setState({files:data});
    }
  }

  render() {
    if (this.state.files.length == 0) {
      return <Cylon/>
    }
    else {
      let headers = ['name', 'description']
      let linkColumns = [{"name": "Details", "url": "/details"}, {"name": "Clusterize", "url": "/clusterizer"} ]
      const { classes } = this.props;
      return(
        <div className={classes.root}>
          <Paper >
            <Table data={this.state.files} header={headers} links={linkColumns} title={"Files"} />
          </Paper>
        </div>
      )
    }
  }
}


File.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(File);