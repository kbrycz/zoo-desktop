import React from 'react';
import defaultImage from '../../../../assets/default.jpg'; // Ensure this path is correct
import '../../styles/Scan/ProfileScreen.css'; // Assuming you'll create or have this CSS file

function ProfileScreen({ user }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="profile-screen">
      <img src={defaultImage} alt="Profile" className="profile-image"/>
      <h1>{user.first} {user.last}</h1>
      <div className="user-stats">
        <p>Joined: {formatDate(user.dateJoined)}</p>
        <p>Birthdate: {formatDate(user.birthdate)}</p>
        <p>Gender: {user.gender === 0 ? 'Male' : 'Female'}</p>
        <p>Current Rewards: {user.currentRewards}</p>
        <p>Lifetime Rewards: {user.lifetimeRewards}</p>
        <p>Notifications: {user.notifications ? 'Enabled' : 'Disabled'}</p>
      </div>
    </div>
  );
}

export default ProfileScreen;
