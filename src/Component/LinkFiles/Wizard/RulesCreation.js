import React,  { Component }  from 'react';
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import  {getColumnContent} from  '../../../Utils/utils' 
import MaterialTable from 'material-table'


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


class RulesCreation extends Component {
  constructor(props) {
    super(props);
    this.state = {matches: [], fileA: this.props.fileA, fileB: this.props.fileB, colA: '', colB: '', values_colA: [], values_colB: []};
  }

  
  onChangeA = event => {
    this.setState({colA : event.target.value})
    let column_content = getColumnContent(this.state.fileA.rows, event.target.value)
    this.setState({values_colA: column_content})

    //this.props.update(event.target.name, event.target.value);
  }

  onChangeB = event => {
    this.setState({colB : event.target.value})
    let column_content = getColumnContent(this.state.fileB.rows, event.target.value)
    this.setState({values_colB: column_content})
    //this.props.update(event.target.name, event.target.value);
  }

  addData(newData){
    this.state.matches.push(newData)
  }



  render(){
    const { classes } = this.props;
    let data = []
    return (
      <div>
      <Typography variant="h6" id="tableTitle" align="left" > Settings </Typography>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="x-native-simple">File: {this.state.fileA.name} Column</InputLabel>
            <Select inputProps={{name: 'a', id: 'x-native-simple'}} name="col_a" value={this.state.colA} onChange={this.onChangeA}>
              {this.state.fileA.cols.map((col) => <MenuItem key={col} value={col}>{col}</MenuItem>)}
            </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="y-native-simple">File: {this.state.fileB.name} Column</InputLabel>
            <Select inputProps={{name: 'b', id: 'y-native-simple'}} name="col_b" value={this.state.colB} onChange={this.onChangeB}>
              {this.state.fileB.cols.map((col) => <MenuItem key={col} value={col}>{col}</MenuItem>)}
            </Select>
        </FormControl>
        <MaterialTable
          title="Editable Preview"
          columns={[{ title: 'Column A', field: 'col_a', lookup: this.state.values_colA },{ title: 'Column B', field: 'col_b', lookup: this.state.values_colB }]}
          data={data}
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  data.push(newData)
                 // this.addData(newData);
                  
                  resolve();
                }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  /*const dataDelete = [...this.state.matches];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  this.setState({matches: dataDelete});*/
                  const index = oldData.tableData.id;
                  const dataDelete = [...data];
                  dataDelete.splice(index, 1);

                  resolve()
                }, 1000)
              }),
          }}
        />
      </div>
    )
  }
}


RulesCreation.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(RulesCreation);
