import React,  { Component }  from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

const Stats = ({
  currentStep,
  firstStep,
  goToStep,
  lastStep,
  nextStep,
  previousStep,
  totalSteps,
  step,
  done,
  
}) => (
  
  <div>
      <hr />
      { step > 1 &&
       <Button variant="contained"  onClick={previousStep}>  Go back </Button>
      } 
      { step < totalSteps ?
          <Button variant="contained"  onClick={nextStep}> Continue </Button>
          :
          <Button variant="contained"  disabled={!done} onClick={nextStep}>  Finish </Button>
      }
      <hr/>  
  </div>
);


class SaveOptions extends Component {

    constructor(props) {
        super(props);
        this.state = {name: '', description: '', done: false, saved: false};
    }

  

    updateName = (e) => {
        let value = e.target.value
        this.props.update(e.target.name, value);
        this.setState({name: value})
        if (!(this.state.name === '') && !(this.state.description === '')){
            this.setState({done: true})
        }
        else {
            this.setState({done:false})
        }
    }
    updateDesc = (e) => {
        let value = e.target.value
        this.props.update(e.target.name, value);
        this.setState({description: value})
        if (!(this.state.name === '') && !(this.state.description === '')){
            this.setState({done: true})
        }
        else {
            this.setState({done: false})
        }
    }

    submitNoFilter = async () => {
        let fileA, fileB
        if(this.props.form.filebase == "fileA"){
            fileA = this.props.form.files[0]
            fileB = this.props.form.files[1]
          }
          else if(this.props.form.filebase == "fileB"){
            fileA = this.props.form.files[1]
            fileB = this.props.form.files[0]
          }
        let promise = await axios.get("http://localhost:8000/link_closest_point/"
                                                  +fileA+"/"+fileB+"/"+this.state.name+"/"+this.state.description)
        let status = promise.status;
        
        if(status===200)
        {
            this.setState({saved: true})
        }
    }

    submitFilter = async () => {
        let fileA, fileB
        if(this.props.form.filebase == "fileA"){
            fileA = this.props.form.files[0]
            fileB = this.props.form.files[1]
          }
          else if(this.props.form.filebase == "fileB"){
            fileA = this.props.form.files[1]
            fileB = this.props.form.files[0]
          }
        let promise = await axios.get("http://localhost:8000/link_closest_point_filter/"
                                                  +fileA+"/"+fileB+"/"+this.props.form.max_distance+"/"+this.state.name+"/"+this.state.description)
        let status = promise.status;
        
        if(status===200)
        {
            this.setState({saved: true})
        }
    }

    submit = () => {
        //sin distancia
        if (!this.props.form.distance){
            this.submitNoFilter()
        }
        //con distancia
        else {
            this.submitFilter()
        }
    }

    render(){
      if(!this.state.saved){
        return (
            <div>
                <Typography variant="h5" id="tableTitle"> Save options </Typography>
                <label>Name</label>
                    <input type='text' className='form-control' name='name' placeholder='Name'
                        onChange={this.updateName} required={true}/>
                <label>Description</label>
                    <input type='text' className='form-control' name='description' placeholder='Description'
                        onChange={this.updateDesc} required={true} />
                <Stats step={3} done={this.state.done} {...this.props} nextStep={this.submit} />
            </div>
            )   ;
    }
    else 
        return <Redirect to={{pathname: '/files'}} />   
    }
}

export default SaveOptions;