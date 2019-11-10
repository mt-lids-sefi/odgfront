import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as  Route, Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';


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
    files:[],
    };
    this.loadFiles = this.loadFiles.bind(this);
  }
 


  componentWillMount() {
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
    const { classes } = this.props;
    return(

      <div className={classes.root}>
      <Paper >
      <Toolbar >
      <div >
       
          <Typography variant="h6" id="tableTitle">
            Files
          </Typography>
        
      </div>
      <div  />
     
    </Toolbar>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Map</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.files.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right"><Link to={{pathname: '/details', mapProps:{doc_id: row.id}}}>View Map</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
      </div>
    )
  }
}


File.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(File);
