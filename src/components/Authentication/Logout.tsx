import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logout as logoutUser } from '../../services/authn';

const Logout: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (authContext) {
        await logoutUser();
        authContext.logout();
        navigate('/');
      } else {
        throw new Error('Authentication context is not available');
      }
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
