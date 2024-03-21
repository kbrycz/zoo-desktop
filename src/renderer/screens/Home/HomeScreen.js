import React from 'react';
import '../../styles/Background.css';
import '../../styles/Home/Home.css';
import { version } from '../../../global/Version';

function HomeScreen() {
  return (
    <div className="background-screen">
      <div className='home-screen'>
        <img src={require('../../../../assets/logo.png')} alt="Brycz Zoo Logo" className="zoo-logo" />
        <h1>Welcome to Brycz Zoo!</h1>
        <h2>Use this application for all your zoo needs!</h2>
        <h3>
          <a href="http://bryczzoo.org" className="website-link" target="_blank" rel="noopener noreferrer">
            Visit our website bryczzoo.org
          </a>
        </h3>
      </div>
      <div className="version-number">
        <p>Version {version}</p>
      </div>
    </div>
  );
}

export default HomeScreen;
