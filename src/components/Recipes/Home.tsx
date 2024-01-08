import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import Logout from '../Authentication/Logout';

const Home: React.FC = () => {
  const { user, isAuthenticated } = useContext(AuthContext) ?? { user: null, isAuthenticated: false };

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      {isAuthenticated ? (
        <div>
          <p>Hello, {user?.username}!</p>
          <Logout />
        </div>
      ) : (
        <div>
          <p>Please login or sign up to continue</p>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/register">
            <button>Sign Up</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
