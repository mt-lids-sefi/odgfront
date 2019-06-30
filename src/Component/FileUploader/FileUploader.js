import React, { Component } from 'react';
import Styles from './Styles';
import Papa from 'papaparse';
import { Redirect } from 'react-router-dom'
 
class FileUploader extends Component {
    constructor(props) {
        super(props);        
        this.state = {
          name: '',
          description: '',
          csvCols: ['lat', 'lon'],
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
          this.setState({redirectToReferrer: true})
          this.setState({savedDocID: responseJson.document_id})
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
        
        this.parseData(event.target.files[0], this.getCols);
        this.setState({"file":event.target.files[0]})

      }

    getCols(data) {
        //Data is usable here
        console.log(data[0]);
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
    const { name, description } = this.state;
    if (this.state.redirectToReferrer){
      let doc_id= this.state.savedDocID
      return <Redirect to="/files" />
    }
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
            <select name="latCol" onChange={this.onChange}>
                  {this.state.csvCols.map((col) => <option key={col} value={col}>{col}</option>)}
             </select>
          </div>
          <div>
            <label>Lon col</label>
            <select name="lonCol" onChange={this.onChange}>
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