import React, { useState } from 'react';
import FAQScreen from '../components/FAQScreen';
import AIScreen from '../components/AIScreen';
import '../styles/HelpScreen.css';

function HelpScreen() {
  const [currentScreen, setCurrentScreen] = useState('');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'faq':
        return <FAQScreen />;
      case 'ai':
        return <AIScreen />;
      default:
        return (
          <>
            <h1>Help & Support</h1>
            <div className="help-buttons">
              <button onClick={() => setCurrentScreen('faq')}>FAQ</button>
              <button onClick={() => setCurrentScreen('ai')}>AI Support</button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="help-screen">
      {currentScreen !== '' && (
        <button className="back-button" onClick={() => setCurrentScreen('')}></button>
      )}
      {renderScreen()}
    </div>
  );
}

export default HelpScreen;