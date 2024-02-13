import React from 'react'
import AudioPlayer from './AudioPlayer/AudioPlayer'
import './Footer.css'

const Footer = (props) => {
const { audioSrc } = props

  return (
    <footer className='footer'>
      <div className="footer-content">
        <AudioPlayer audioSrc={audioSrc}/>
      </div>
    </footer>
  );
};

export default Footer;