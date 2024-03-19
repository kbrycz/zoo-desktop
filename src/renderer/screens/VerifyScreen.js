import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import server from '../../api/server'; // Adjust the import path as needed

function VerifyScreen({login}) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { phone } = location.state; // Retrieve phone number passed from AuthScreen

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await server.post('/handleAuth', { phone: `+1${phone}` , code: code});
      if (response.data.newAccount) {
        // Handle new account scenario
      } else {
        // Navigate to home screen for existing users
        login(response.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Enter Verification Code</h1>
      <form onSubmit={handleCodeSubmit}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="12345"
          disabled={loading}
        />
        <button type="submit" disabled={loading || code.length !== 5}>Verify</button>
      </form>
    </div>
  );
}

export default VerifyScreen;
