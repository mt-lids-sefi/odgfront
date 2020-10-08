import React, { Component } from "react";
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import DataTable  from 'react-data-table-component';
import { withStyles } from '@material-ui/core/styles';
import Cylon from '../LoadingComponents/Cylon';
import { BrowserRouter as  Route, Link } from 'react-router-dom';
import { CSVLink } from "react-csv";

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

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:this.props.data,
      headers: this.props.header,
      title: this.props.title,
      links: this.props.links,
      linkColumns: [],
      columns: [],
      rows: []
    };
    this.proccessData = this.proccessData.bind(this);
    this.createRows = this.createRows.bind(this);
  }

  componentDidMount() {
    this.proccessData();
  }

  proccessData(){
    this.createColumns();
    this.createRows();
    if (this.state.links != null){
      this.createLinkColumns();
    }
   // let csvData = json2csv(this.state.data);
   // this.setState({csvData: csvData})
  }

  createRows(){
    let rows = []
    for (let i = 0; i < Object.keys(this.state.data).length; i++){
        let row = this.state.data[i]
        row['id_key'] = i
        rows[i] = row
    }
    this.state.rows = rows
  }

  createColumns(){
    let columns = []
    let column = {}
    this.state.headers.map(header => (
        column = {
          name: header.charAt(0).toUpperCase() + header.slice(1),
          selector: header,
          sortable: true
        },
        columns.push(column)
    ))
    this.setState({columns: columns})
  }

  createLinkColumns(){
    let linkColumns = []
    let column = []
    this.state.links.map(link => (
      column = {
        name: link['name'],
        button: true,
      cell: row =>  <Link to={{pathname: link['url'], mapProps: {doc_id: row.id}}}>{link['name']}</Link>
      },
      linkColumns.push(column)
    ))
    this.setState({linkColumns: linkColumns})
  }

  render() {
    if (this.state.rows == []) {
      return <Cylon/>
    }
    else {
      console.log(this.state.data)
      return(
        <div>
          <DataTable
            title={this.state.title}
            keyField="id_key"
            columns={this.state.columns.concat(this.state.linkColumns)}
            data={this.state.rows}
            pagination
          />
          <CSVLink data={this.state.rows}>Download me</CSVLink>
        </div>
      )
    }
  }
}


Table.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Table);
