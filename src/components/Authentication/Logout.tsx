import React from 'react';
import { logout } from '../../services/authn';

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      await logout();
      alert('You have been logged out successfully');
    } catch (error) {
      alert('Failed to logout');
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;