import { withStyles } from '@material-ui/core/styles';
import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import Cylon from '../LoadingComponents/Cylon';
import StepWizard from 'react-step-wizard';
import FileDetails from '../FileDetails/FileDetails';
import ClusterDetails from './Wizard/ClusterDetails';
import ClusterSettings from './Wizard/ClusterSettings';
import ClusterPreview from './Wizard/ClusterPreview';
import File from '../File/File';
import { Redirect } from 'react-router-dom'
import SaveClusterization from './Wizard/SaveClusterization';


const styles = theme => ({
    root: {
      flexGrow: 1
    },
    paper: { 
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    }
  });
  

class Clusterizer extends Component {
  constructor(props) {
    super(props);
    if(this.props.location.mapProps){
      this.state = {
     file_id : this.props.location.mapProps.doc_id,
     props : this.props,
     form: {file: this.props.location.mapProps.file_id, algorithm: 'meanshift'},
    };
    } 
    else{
      this.state  = {
        return : true
      }
    }
    
  }

  updateForm = (key, value) => {
    const { form } = this.state;

    form[key] = value;
    this.setState({ form });
}



    render(){
      const { classes } = this.props;
      if (this.state.return){
  
        return <Redirect to={{pathname: '/files'}} />
      }
      if (this.state.file_id == null){
        return ( <Cylon />)
      }
      
      else {
        return (
          <div className={classes.root}>
            <div className={'jumbotron'}>
              <StepWizard>  
                <ClusterDetails file={this.state.file_id} />
                <ClusterSettings update={this.updateForm}  form={this.state.form} file={this.state.file_id} />
                <SaveClusterization update={this.updateForm} form={this.state.form}/>
              </StepWizard>
            </div>
          </div>
        );
      }
    }
}


Clusterizer.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(Clusterizer);
  