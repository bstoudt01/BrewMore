import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import BrewMore from './components/BrewMore';

ReactDOM.render(
  <Router>
    <BrewMore />
    </Router>,
  document.getElementById('root')
);

