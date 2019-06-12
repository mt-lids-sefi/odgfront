import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./index.css";
import CSVReader from "react-csv-reader";

const handleForce = data => {
  console.log(data);
};

const reader = (
  <div className="container">
    <CSVReader
      cssClass="react-csv-input"
      label="Select CSV with secret Death Star statistics"
      onFileLoaded={handleForce}
    />
    <p>and then open the console</p>
  </div>
);

ReactDOM.render(
  <App />,
//  reader,
  document.getElementById('root')
);
