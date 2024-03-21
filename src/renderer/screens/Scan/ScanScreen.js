import React, { useState } from 'react';
import QRScreen from './QRScreen';
import SearchScreen from './SearchScreen';
import ProfileScreen from './ProfileScreen'; // Import ProfileScreen
import '../../styles/Scan/Scan.css';

function ScanScreen() {
  const [currentScreen, setCurrentScreen] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // State to hold selected user

  const handleBackClick = () => {
    setCurrentScreen('');
    setSelectedUser(null); // Clear selected user when going back
  };

  const handleUserFound = (user) => {
    setSelectedUser(user);
    setCurrentScreen('profile'); // Navigate to ProfileScreen
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'qr':
        return <QRScreen />;
      case 'search':
        return <SearchScreen onUserFound={handleUserFound} />;
      case 'profile':
        return selectedUser && <ProfileScreen user={selectedUser} />;
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
      {currentScreen !== '' && <button className="back-button" onClick={handleBackClick}></button>}
      {renderCurrentScreen()}
    </div>
  );
}

export default ScanScreen;
