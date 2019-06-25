import React, { Component } from 'react';
import Styles from './Styles';
import { Form, Field } from 'react-final-form';
import CSVReader from "react-csv-reader";




 
class FileUploader extends Component {
    constructor(props) {
        super(props);        
        this.state = {
          name: '',
          email: '',
          description: '',
          csvCols: ['lat', 'lon']
        }
      }
   
      onSubmit = async values => {
        console.log("submit")
      }
     changeHandler = event => {
        this.setState({
            email: event.target.value
        });
      }
      handleCSV = data => {
        this.setState({"csvCols": data[0]})
      };


  render() {
    return (
      <Styles>
      <h1>Upload File</h1>
      <Form
        onSubmit={this.onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <Field
                name="name"
                component="input"
                type="text"
                placeholder="Name"
              />
            </div>
            
            
         
            <div>
              <label>Notes</label>
              <Field name="description" component="textarea" placeholder="Description" />
            </div>
            <div>
              <CSVReader
                cssClass="react-csv-input"
                label="Select CSV"
                onFileLoaded={this.handleCSV}
              />
            </div>
            <div>
            <label>Lat col</label>
            <select>
                  {this.state.csvCols.map((col) => <option key={col} value={col}>{col}</option>)}
             </select>
          </div>
          <div>
            <label>Lon col</label>
            <select>
                  {this.state.csvCols.map((col) => <option key={col} value={col}>{col}</option>)}
             </select>
          </div>
            <div className="buttons">
              <button type="submit" disabled={submitting || pristine}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
    </Styles>
    );
  }
}

export default FileUploader;