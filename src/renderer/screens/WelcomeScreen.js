import React from 'react';
import { useNavigate } from 'react-router-dom';

function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="welcome-screen">
      <h1>Welcome!</h1>
      <button onClick={() => navigate('/auth')}>Sign In</button>
    </div>
  );
}

export default WelcomeScreen;
