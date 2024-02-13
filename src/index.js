import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <BrowserRouter>
    <div style={{ backgroundColor: '#222', color: '#fff' }}>
      <App />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);
