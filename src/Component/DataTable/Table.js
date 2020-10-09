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
      selectable: false,
      linkColumns: [],
      columns: [],
      rows: [], 
      download: false
    };
    if (this.props.selectable != null){
      this.state.selectable = this.props.selectable
    }
    if (this.props.download != null){
      this.state.download = this.props.download
    }
    if (this.props.headersDesc != null){
      this.state.headersDesc = this.props.headersDesc
    }
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
    let name
    this.state.headers.map(header => (
        name = this.state.headersDesc != null ? this.state.headersDesc[header] : header.charAt(0).toUpperCase() + header.slice(1),
        column = {
          name: name,
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
            selectableRows={this.state.selectable}
            selectableRowDisabled= {row => row.fat > 6}
          />
          {this.state.download && <CSVLink align="left" data={this.state.rows}>Descargar CSV</CSVLink>}
        </div>
      )
    }
  }
}


Table.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Table);
/*si hay dos seleccionadas y no soy una de ellas, disable*/