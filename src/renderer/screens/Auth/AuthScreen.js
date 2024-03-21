import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import server from '../../../api/server';
import '../../styles/Auth/AuthBackground.css';
import '../../styles/Auth/AuthScreen.css';
import { version } from '../../../global/Version';

function AuthScreen() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhoneChange = (event) => {
    const formattedPhoneNumber = formatPhoneNumber(event.target.value);
    setPhone(formattedPhoneNumber);
  };

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await server.get('/twilioVerify', { params: { phone: unformatPhoneNumber(phone) } });
      navigate('/verify', { state: { phone: unformatPhoneNumber(phone) } });
    } catch (error) {
      console.error('Verification initiation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, '');
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const unformatPhoneNumber = (value) => {
    return value.replace(/[^\d]/g, '');
  };

  return (
    <div className="welcome-screen">
      <button className='back-button' onClick={() => navigate('/welcome')}></button>
      <h1>Sign in</h1>
      <h2>You will receive a text for verification</h2>
      <form onSubmit={handlePhoneSubmit} className='phone-login-form'>
        <input
          type="tel"
          value={phone}
          onChange={handlePhoneChange} // Format the phone number on input
          placeholder="(123) 456-7890"
          disabled={loading}
          maxLength={14} // Maximum length for the formatted phone number
        />
        <button type="submit" disabled={loading || phone.length < 14}>Send Verification Code</button>
      </form>
      <div className="version-number">
        <p>Version {version}</p>
      </div>
    </div>
  );
}

export default AuthScreen;
