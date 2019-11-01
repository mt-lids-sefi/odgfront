import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as  Route, Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';



export default class Clusterize extends Component {
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
    const promise = await axios.get("http://localhost:8000/file");
    const status = promise.status;
    if(status===200)
    {
      const data = promise.data;
      this.setState({files:data});
    }
  }

  render() {
    return(
    
    
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
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.files.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right"><Link to={{pathname: '/clusterizer', mapProps:{doc_id: row.id}}}>Select</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
    )
  }
}

