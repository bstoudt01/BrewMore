import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";

import './index.css';
import BrewMore from './components/BrewMore';
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
  //<React.StrictMode>
  <Router>
    <BrewMore />
    </Router>,
  //</React.StrictMode>,
  document.getElementById('root')
);

