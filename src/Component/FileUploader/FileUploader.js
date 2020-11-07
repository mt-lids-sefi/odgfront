import React, { Component } from 'react';
//import Styles from './Styles';
import Papa from 'papaparse';
import { Redirect } from 'react-router-dom'
import Input from '@material-ui/core/Input'; 
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 600,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none',
  }
});


class FileUploader extends Component {
    constructor(props) {
        super(props);        
        this.state = {
          name: '',
          description: '',
          csvCols: [],
          latCol: '',
          lonCol: '',
          file: null,
          redirectToReferrer: false,
          savedDocID: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getCols = this.getCols.bind(this);
      }

      handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        
        data.append('name', this.state.name)
        data.append('doc', this.state.file)
        data.append('description', this.state.description)
        data.append('lat_col', this.state.latCol)
        data.append('lon_col', this.state.lonCol)
        
        fetch( 'http://localhost:8000/upload/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json'
          },
          body: data
         })
        .then((response) => response.json())
        .then((responseJson) => {
          // Perform success response.
          console.log(responseJson);
          this.setState({redirectToReferrer: true})
         }   
        )
        .catch((error) => {
            console.log(error)
        })
      }

  
      onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
      }

      handleUploadFile = event => {
        
        this.parseData(event.target.files[0], this.getCols);
        this.setState({"file":event.target.files[0]})

      }

    getCols(data) {
        //Data is usable here
        
        this.setState({"csvCols": data[0]})
    }
    
    parseData(url, callBack) {
        Papa.parse(url, {
            download: true,
            dynamicTyping: true,
            complete: function(results) {
                callBack(results.data);
            }
        });
    }
    

  render() {
    const { classes } = this.props;
    const { name, description } = this.state;
    if (this.state.redirectToReferrer){
      return <Redirect to="/files" />
    }
    return (
      <div>
      <Paper className={classes.paper}>
      <div > 
        <Typography variant="h5" id="tableTitle">
            Carga de conjunto de datos georeferenciados
          </Typography>
        </div>
        <hr />
        <form onSubmit={this.handleSubmit}>
        <div><Input type="file" placeholder="Seleccionar archivo" onChange={this.handleUploadFile} /></div>
        <hr />
            <div>
              <label>Nombre &nbsp;&nbsp; </label>
              <Input name="name" component="input"  type="text" placeholder="Nombre" value={name} onChange={this.onChange} />
            </div>
            <hr />
            <div>
              <label>Descripción &nbsp;&nbsp; </label>
              <Input name="description" component="textarea" placeholder="Descripción"  value={description} onChange={this.onChange} />
            </div>
            <hr />
            <div>
          </div>
            <div>
            <label>Columna de latitud &nbsp;&nbsp; </label>
            <select name="latCol" onChange={this.onChange}>
                  {this.state.csvCols.map((col) => <option key={col} value={col}>{col}</option>)}
             </select>
          </div>
          <hr />
          <div>
            <label>Columna de longitud &nbsp;&nbsp; </label> 
            <select name="lonCol" onChange={this.onChange}>
                  {this.state.csvCols.map((col) => <option key={col} value={col}>{col}</option>)}
             </select>
          </div>
          <hr />
            <div className="button">
              <Button variant="contained" className={classes.button} type="submit">
                Guardar
              </Button>
            </div>
          </form>
          
          </Paper>
        </div>
    );
  }
}

FileUploader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FileUploader);
