import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Background.css';
import '../../styles/Settings/Settings.css';
import { version } from '../../../global/Version';

function SettingsScreen({logout}) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Remove the user token from local storage
    logout()
    localStorage.removeItem('userToken');
    
    // Navigate to the Welcome screen
    navigate('/welcome');
  };

  return (
    <div className="background-screen">
      <div className='settings-screen'>
        <img src={require('../../../../assets/logo.png')} alt="Brycz Zoo Logo" className="zoo-logo" />
        <h1>Settings</h1>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <div className="version-number">
        <p>Version {version}</p>
      </div>
    </div>
  );
}

export default SettingsScreen;
