import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import server from '../../api/server'; // Adjust the import path as needed

function AuthScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await server.get('/twilioVerify', { params: { phone: `+1${phone}` } });
      navigate('/verify', { state: { phone } }); // Pass phone number to VerifyScreen
    } catch (error) {
      console.error('Verification initiation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <form onSubmit={handlePhoneSubmit}>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} // Only allow numbers
          placeholder="(123) 456-7890"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !phone}>Send Verification Code</button>
      </form>
    </div>
  );
}

export default AuthScreen;
