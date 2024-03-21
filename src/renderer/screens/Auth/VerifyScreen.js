import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import server from '../../../api/server'; // Adjust the import path as needed
import { version } from '../../../global/Version';
import '../../styles/Background.css';
import '../../styles/Auth/AuthScreen.css';

function VerifyScreen({ login }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { phone } = location.state; // Retrieve phone number passed from AuthScreen

  const handleCodeChange = (event) => {
    const enteredCode = event.target.value.replace(/\D/g, ''); // Allow only digits
    if (enteredCode.length <= 5) {
      setCode(enteredCode);
    }
  };

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Clear previous error messages
    try {
      const response = await server.post('/handleAuth', { phone: phone, code: code });
      if (response.data.newAccount) {
        // Handle new account scenario
      } else {
        // Navigate to home screen for existing users
        login(response.data.token);
        navigate('/');
      }
    } catch (error) {
      setError('Verification failed. Invalid code.');
      console.error('Verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="background-screen welcome-screen">
      <button className='back-button' onClick={() => navigate('/welcome')}></button>
      <h1>Enter Verification Code</h1>
      <h2>Enter the code below to sign in</h2>
      <form className='phone-login-form' onSubmit={handleCodeSubmit}>
        <input
          type="text"
          value={code}
          onChange={handleCodeChange}
          placeholder="12345"
          maxLength={5} // Ensure input does not accept more than 5 characters
          disabled={loading}
        />
        <button className='submit-button' type="submit" disabled={loading || code.length !== 5}>Verify</button>
      </form>
      {error && <div className="form-error">{error}</div>}
      <div className="version-number">
        <p>Version {version}</p>
      </div>
    </div>
  );
}

export default VerifyScreen;
