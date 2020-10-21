import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as  Route, Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '../DataTable/Table'
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

class Configurations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      c12s: [],
    };
    this.loadC12s = this.loadC12s.bind(this);
  }

  componentDidMount() {
    this.loadC12s();
  }

  async loadC12s()
  {
    const promise = await axios.get("http://localhost:8000/configurations");
    const status = promise.status;
    if(status===200)
    {
      const data = promise.data;
      this.setState({c12s:data});
    }
  }

  render() {
    if (this.state.c12s.length == 0) {
      return <Cylon/>
    }
    else {
      let headers = ['name', 'description']
      let headersDesc = {"name": "Nombre", "description": "Descripción"}
      let linkColumns = [{"name": "Ver", "url": "/view_conf"}]
      const { classes } = this.props;
      return(
        <div className={classes.root}>
          <Paper >
            <Table data={this.state.c12s} header={headers} links={linkColumns} headersDesc={headersDesc} title={"Configuraciones"} />
          </Paper>
        </div>
      )
    }
  }
}


Configurations.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Configurations);