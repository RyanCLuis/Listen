import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AudioPlayer from './components/AudioPlayer/AudioPlayer';

ReactDOM.render(
  <BrowserRouter>
    <App />
    <AudioPlayer />
  </BrowserRouter>,
  document.getElementById('root')
);
