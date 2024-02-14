import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { isAuthenticated, user } = useContext(AuthContext) || { isAuthenticated: false, user: null };

  console.log(user); // Add this line to log the user object

  return (
    <div className="home-container">
      <div className="home-background">
        {isAuthenticated ? (
          <h1 className="slogan">Welcome back! Start exploring recipes, {user?.id}.</h1>
        ) : (
          <h1 className="slogan">Explore, Cook, Devour: Your Recipe Haven.</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
