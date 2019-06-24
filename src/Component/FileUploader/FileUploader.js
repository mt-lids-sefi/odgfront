import React, { Component } from 'react';

class FileUploader extends Component {
    constructor(props) {
        super(props);        
        this.state = {
          name: '',
          email: '',
          description: ''
        }
      }
   
     changeHandler = event => {
        this.setState({
            email: event.target.value
        });
    }
  render() {
    return (
        <form>
            <input type="email" 
                name="email"   
                value={this.state.email} 
                onChange={this.changeHandler} 
            />
        </form>
    );
  }
}

export default FileUploader;