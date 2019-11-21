import { withStyles } from '@material-ui/core/styles';
import React,  { Component }  from 'react';
import PropTypes from 'prop-types';
import Cylon from '../LoadingComponents/Cylon';
import StepWizard from 'react-step-wizard';
import FileDetails from '../FileDetails/FileDetails';
import ClusterDetails from './Wizard/ClusterDetails';
import ClusterSettings from './Wizard/ClusterSettings';
import ClusterPreview from './Wizard/ClusterPreview';

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
    this.state = {
     file_id : this.props.location.mapProps.file_id,
     props : this.props,
     form: {file: this.props.location.mapProps.file_id , algorithm:'',  k: '', col_x: '', col_y: '', name:'', description: ''},
    };
  }

  updateForm = (key, value) => {
    const { form } = this.state;

    form[key] = value;
    this.setState({ form });
}



    render(){
      const { classes } = this.props;
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
                <ClusterPreview update={this.updateForm}  form={this.state.form} file={this.state.file_id} />
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
  