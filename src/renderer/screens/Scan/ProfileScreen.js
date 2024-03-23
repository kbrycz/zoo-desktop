import React, { useState } from 'react';
import defaultImage from '../../../../assets/default.jpg'; // Ensure this path is correct
import '../../styles/Scan/ProfileScreen.css'; // Assuming you'll create or have this CSS file

function ProfileScreen({ user }) {
  const [loading, setLoading] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="profile-screen">
      <img src={defaultImage} alt="Profile" className="profile-image"/>
      <h1>{user.first} {user.last}</h1>
      <div className="user-stats">
        <div className="stat-item">
          <span className="label">Joined:</span> <span className="value">{formatDate(user.dateJoined)}</span>
        </div>
        <div className="stat-item">
          <span className="label">Birthdate:</span> <span className="value">{formatDate(user.birthdate)}</span>
        </div>
        <div className="stat-item">
          <span className="label">Gender:</span> <span className="value">{user.gender === 0 ? 'Male' : 'Female'}</span>
        </div>
        <div className="stat-item">
          <span className="label">Current Rewards:</span> <span className="value">{user.currentRewards}</span>
        </div>
        <div className="stat-item">
          <span className="label">Lifetime Rewards:</span> <span className="value">{user.lifetimeRewards}</span>
        </div>
        <div className="stat-item">
          <span className="label">Notifications:</span> <span className="value">{user.notifications ? 'Enabled' : 'Disabled'}</span>
        </div>
        <button className="profile-button" disabled={loading}>
          Admit to Zoo
        </button>
        <button className="profile-button" disabled={loading}>
          Edit Information
        </button>
      </div>
    </div>
  );
}

export default ProfileScreen;
