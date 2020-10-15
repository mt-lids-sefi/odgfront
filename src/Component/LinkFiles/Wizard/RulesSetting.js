import React,  { Component, useRef }  from 'react';
import axios from "axios";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Popup from "reactjs-popup";
import RulesCreation from './RulesCreation';
import DataTable  from 'react-data-table-component';
import  {addRule} from  '../../../Utils/utils' 
import { utils } from 'react-bootstrap';


const Stats = ({
    currentStep,
    firstStep,
    goToStep,
    lastStep,
    nextStep,
    previousStep,
    totalSteps,
    step,
    
  }) => (
    
    <div>
        <hr />
        { step > 1 &&
         <Button variant="contained"  onClick={previousStep}>Atrás </Button>
        } 
        { step < totalSteps ?
            <Button variant="contained"  onClick={nextStep}> Continuar </Button>
            :
            <Button variant="contained"  onClick={nextStep}>  Finalizar </Button>
        }
        <hr/>  
    </div>
  );

  
  
class RulesSetting extends Component {
 
  constructor(props) {
    super(props);
    this.state = {rules: [],  open: false, available_preview: false, jsonRules: []}
    this.setOpen = this.setOpen.bind(this);
  }


  update = (prop, value) => {
    this.props.update(prop, value);
  }

  updateForm = (key, value) => {
    const { form } = this.state;

    form[key] = value;
    this.setState({ form });
  }

  updateRules = (rule) => {
    for (let i = 0; i < this.state.rules.length; i++){
      if ((this.state.rules[i]['col_a'] == rule['col_a'] 
            && this.state.rules[i]['col_b'] == rule['col_b'] 
            && this.state.rules[i]['match'][0] == rule['match'][0] 
            && this.state.rules[i]['match'][1] == rule['match'][1] )){
        this.setState({open: !this.state.open})
        return
      }
    }
    this.state.rules.push(rule)
    let jsonRules = this.state.jsonRules
    jsonRules = addRule(rule, jsonRules)
    this.setState({open: !this.state.open, jsonRules: jsonRules, available_preview: true})
  }

  setOpen() {
    this.setState(state => ({
      open: !state.open
    }));
    this.forceUpdate();
  }

  preview = async () => {
    console.log(this.state.jsonRules)
  }

    render(){
      const columns = [{name: 'Columna conjunto de datos A',selector: 'col_a',sortable: true},
                      {name: 'Columna conjunto de datos B',selector: 'col_b',sortable: true},
                      {name: 'Semejanza',selector: 'match',sortable: true}];
      return (     
           <div>
             <Typography variant="h6" id="tableTitle"> Crear reglas de semejanza</Typography>
             <DataTable
                data={this.state.rules}
                columns={columns}
                pagination
                noDataComponent="No hay datos para mostrar"
                paginationComponentOptions={{ rowsPerPageText: 'Filas por página:'}}
              />
            <Button onClick={this.setOpen}> Agregar regla </Button>
             <Popup  position="right center"  
                    modal
                    closeOnDocumentClick={false}
                    open={this.state.open} >
              <div><RulesCreation fileA={this.props.form.data_fileA} fileB={this.props.form.data_fileB} update={this.updateRules}  form={this.state.form} /></div>
            </Popup>
            <Button variant="contained"  onClick={this.preview} disabled={!this.state.available_preview}>  Previsualizar </Button>
            <Stats step={2} {...this.props} />
        </div>
       
        );
      
    }
}


export default RulesSetting;
