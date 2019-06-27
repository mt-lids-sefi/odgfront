import React, { Component } from 'react';
import Styles from './Styles';
import Papa from 'papaparse';

 
class FileUploader extends Component {
    constructor(props) {
        super(props);        
        this.state = {
          name: '',
          description: '',
          csvCols: ['lat', 'lon'],
          latCol: '',
          lonCol: '',
          file: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        
        data.append('name', this.state.name)
        data.append('doc', this.state.file)
        data.append('description', this.state.description)
        console.log(data)
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
        console.log(event.target.files[0])
        let data = Papa.parse(event.target.files[0], {})
        console.log(data)
        this.setState({"file":event.target.files[0]})

      }

  render() {
    const { name, description } = this.state;
    return (
      <Styles>
      <h1>Upload File</h1>
      
        <form onSubmit={this.handleSubmit}>
            <div>
              <label>Name</label>
              <input name="name" component="input"  type="text" placeholder="Name" value={name} onChange={this.onChange} />
            </div>
            <div>
              <label>Description</label>
              <input name="description" component="textarea" placeholder="Description"  value={description} onChange={this.onChange} />
            </div>
            <div>
            <input type="file" onChange={this.handleUploadFile} />
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
              <button type="submit" >
                Submit
              </button>
             
            </div>
            
          </form>
     
    </Styles>
    );
  }
}

export default FileUploader;