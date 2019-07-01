import React, { Component } from "react";
import axios from "axios";
import { BrowserRouter as  Route, Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

export default class File extends Component {
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
            <TableRow key={row.document_id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right"><Link to={{pathname: '/map', mapProps:{doc_id: row.document_id}}}>View Map</Link></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </Paper>
    )
  }
}

