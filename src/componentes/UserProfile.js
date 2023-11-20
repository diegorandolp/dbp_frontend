// UserProfile.js
import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div>
      <h3>User Profile</h3>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {/* Agrega más información del usuario según sea necesario */}
    </div>
  );
};

export default UserProfile;
