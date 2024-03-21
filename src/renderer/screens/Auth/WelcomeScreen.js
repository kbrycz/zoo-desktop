import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Auth/Welcome.css';
import '../../styles/Background.css';
import { version } from '../../../global/Version'


function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="background-screen">
      <div className='welcome-screen'>
        <h1>Welcome to Brycz Zoo</h1>
        <h2>The desktop app for all your needs!</h2>
        <div className="welcome-screen-buttons">
          <button onClick={() => navigate('/auth')}>Log in with your phone number</button>
          <button onClick={() => window.open('http://bryczzoo.org', '_blank', 'noopener,noreferrer')}>
            Sign up via the mobile app
          </button>
        </div>
      </div>
      <div className="version-number">
        <p>Version {version}</p>
      </div>
    </div>
  );
}

export default WelcomeScreen;
