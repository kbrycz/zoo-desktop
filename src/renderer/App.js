import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaHome, FaCog, FaSearch, FaEdit, FaPaw, FaQuestionCircle } from 'react-icons/fa'; // importing icons
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import ScanScreen from './screens/ScanScreen';
import PostScreen from './screens/PostScreen';
import AnimalScreen from './screens/AnimalScreen';
import HelpScreen from './screens/HelpScreen';
import './styles/Variables.css';
import './styles/App.css';

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
              <Link to="/scan"><FaSearch className="icon" />Scan</Link>
            </li>
            <li>
              <Link to="/post"><FaEdit className="icon" />Post</Link>
            </li>
            <li>
              <Link to="/animal"><FaPaw className="icon" />Animal</Link>
            </li>
            <li>
              <Link to="/help"><FaQuestionCircle className="icon" />Help</Link>
            </li>
            <li>
              <Link to="/settings"><FaCog className="icon" />Settings</Link>
            </li>
          </ul>
        </nav>
        <div className="content">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/scan" element={<ScanScreen />} />
            <Route path="/post" element={<PostScreen />} />
            <Route path="/animal" element={<AnimalScreen />} />
            <Route path="/help" element={<HelpScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
