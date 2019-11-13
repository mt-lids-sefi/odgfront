import React, { Component } from 'react';
import Styles from './Styles';
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


class DataFileUploader extends Component {
    constructor(props) {
        super(props);        
        this.state = {
          name: '',
          description: '',
          csvCols: [],
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
        
        fetch( 'http://localhost:8000/upload/datafile', {
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
      <Styles>
        <div className={classes.root}>
       
        <Typography variant="h4" id="tableTitle">
           Data file upload
          </Typography>
        <form onSubmit={this.handleSubmit}>
          
        <div><Input type="file" onChange={this.handleUploadFile} /></div>
        <hr />
            <div>
              <label>Name</label>
              <Input name="name" component="input"  type="text" placeholder="Name" value={name} onChange={this.onChange} />
            </div>
            <div>
              <label>Description</label>
              <Input name="description" component="textarea" placeholder="Description"  value={description} onChange={this.onChange} />
            </div>
            <div>
          </div>
                   
          
            <div className="buttons">
              <Button variant="contained" color="primary" type="submit" >
                Submit
              </Button>
             
            </div>
            
          </form>
         
          </div>
       
    </Styles>
    );
  }
}

DataFileUploader.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DataFileUploader);
