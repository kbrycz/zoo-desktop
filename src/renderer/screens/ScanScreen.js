// ScanScreen.js
import React, { useState } from 'react';
import QRScreen from '../components/QRScreen';
import SearchScreen from '../components/SearchScreen';
import '../styles/Scan.css';

function ScanScreen({ goToProfileScreen }) {
  const [currentScreen, setCurrentScreen] = useState('');

  const handleBackClick = () => {
    // This will now set currentScreen to empty string, showing the main Scan options
    setCurrentScreen('');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'qr':
        return (
          <>
            <button className="back-button" onClick={handleBackClick}>←</button>
            <QRScreen />
          </>
        );
      case 'search':
        return (
          <>
            <button className="back-button" onClick={handleBackClick}>←</button>
            <SearchScreen />
          </>
        );
      default:
        return (
          <>
            <h1>Scan Options</h1>
            <div className="scan-screen-buttons">
              <button onClick={() => setCurrentScreen('qr')}>Scan QR Code</button>
              <button onClick={() => setCurrentScreen('search')}>Search via Name / Number</button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="scan-screen">
      {renderCurrentScreen()}
    </div>
  );
}

export default ScanScreen;
