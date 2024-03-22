import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { FaHome, FaCog, FaSearch, FaEdit, FaPaw, FaQuestionCircle } from 'react-icons/fa';
import HomeScreen from './screens/Home/HomeScreen';
import SettingsScreen from './screens/Settings/SettingsScreen';
import ScanScreen from './screens/Scan/ScanScreen';
import PostScreen from './screens/Post/PostScreen';
import HelpScreen from './screens/Help/HelpScreen';
import WelcomeScreen from './screens/Auth/WelcomeScreen';
import AuthScreen from './screens/Auth/AuthScreen';
import VerifyScreen from './screens/Auth/VerifyScreen';
import './styles/Variables.css';
import './styles/App.css';
import './styles/Sidebar.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsAuthenticated(!!token);
    setLoading(false); // Set loading to false after checking token
  }, []);

  const login = (token) => {
    localStorage.setItem('userToken', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div>Loading...</div>; // Or any other loading indicator
  }

  const Sidebar = () => (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/home"><FaHome className="icon" />Home</Link>
        </li>
        <li>
          <Link to="/scan"><FaSearch className="icon" />Scan</Link>
        </li>
        <li>
          <Link to="/post"><FaEdit className="icon" />Post</Link>
        </li>
        <li>
          <Link to="/help"><FaQuestionCircle className="icon" />Help</Link>
        </li>
        <li>
          <Link to="/settings"><FaCog className="icon" />Settings</Link>
        </li>
      </ul>
    </nav>
  );

  return (
    <Router>
      <div className="app">
        {isAuthenticated && <Sidebar />}
        <div className="content">
          <Routes>
            <Route path="/home" element={isAuthenticated ? <HomeScreen /> : <Navigate to="/welcome" />} />
            <Route path="/welcome" element={<WelcomeScreen />} />
            <Route path="/auth" element={<AuthScreen />} />
            <Route path="/verify" element={<VerifyScreen login={login}/>} />
            <Route path="/scan" element={isAuthenticated ? <ScanScreen /> : <Navigate to="/welcome" />} />
            <Route path="/post" element={isAuthenticated ? <PostScreen /> : <Navigate to="/welcome" />} />
            <Route path="/help" element={isAuthenticated ? <HelpScreen /> : <Navigate to="/welcome" />} />
            <Route path="/settings" element={isAuthenticated ? <SettingsScreen logout={logout}/> : <Navigate to="/welcome" />} />
            <Route path="*" element={<Navigate replace to={isAuthenticated ? "/home" : "/welcome"} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
