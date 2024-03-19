import React from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h1>Settings Screen</h1>
      <p>Adjust your settings here.</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
}

export default SettingsScreen;
