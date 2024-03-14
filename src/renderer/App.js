import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaCog } from 'react-icons/fa'; // importing icons
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';
import './Variables.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="sidebar">
          <ul>
            <li>
              <Link to="/"><FaHome className="icon" />Home</Link>
            </li>
            <li>
              <Link to="/settings"><FaCog className="icon" />Settings</Link>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
