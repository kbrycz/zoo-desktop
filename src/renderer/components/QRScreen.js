// QRScreen.js
import React, { useState, useEffect } from 'react';
import '../styles/QRScreen.css';

function QRScreen() {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Space') {
        setIsListening((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listener
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="qr-screen">
      <h1>QR Code</h1>
      <div className="qr-message">
        {isListening ? 'Listening...' : 'Press Space Bar to Begin Listening for QR Codes'}
      </div>
    </div>
  );
}

export default QRScreen;
