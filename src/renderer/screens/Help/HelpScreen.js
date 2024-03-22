import React, { useState } from 'react';
import FAQScreen from './FAQScreen';
import AIScreen from './AIScreen';
import '../../styles/Help/HelpScreen.css';
import '../../styles/Background.css';

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
            <div className="help-buttons screen-buttons">
              <button onClick={() => setCurrentScreen('faq')}>FAQ</button>
              <button onClick={() => setCurrentScreen('ai')}>AI Support</button>
            </div>
          </>
        );
    }
  };

  return (
    <div className='background-screen'>
      {currentScreen !== '' && (
        <button className="back-button" onClick={() => setCurrentScreen('')}>
          ←
        </button>
      )}
      <div className="help-screen">
        {renderScreen()}
      </div>
    </div>
  );
}

export default HelpScreen;