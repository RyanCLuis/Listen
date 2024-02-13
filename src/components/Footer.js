import React from 'react'
import AudioPlayer from './AudioPlayer/AudioPlayer'
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-content">
        <AudioPlayer />
      </div>
    </footer>
  );
};

export default Footer;