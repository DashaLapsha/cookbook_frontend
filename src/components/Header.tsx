import React, { useEffect, useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../css/header.scss';
import logo from '../assets/logo.svg';

const Header: React.FC = () => {
  const authContext = useContext(AuthContext);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname !== '/auth') {
        const winTop = window.scrollY;
        setIsSticky(winTop >= 30);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/auth') {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  }, [location.pathname]);

  if (!authContext) {
    return null;
  }

  const { isAuthenticated, user, logout } = authContext;

  const handleLogout = async () => {
    try {
      if (authContext) {
        await logout();
        logout();
        navigate('/');
      } else {
        throw new Error('Authentication context is not available');
      }
    } catch (error) {
      alert('Failed to logout');
    }
  };

  return (
    <header id="header" className={isSticky ? 'sticky-header' : ''}>
      <div className="header-content">
        {!isSticky && <img src={logo} alt="Brand" className="brand-image" />}
        <div className="brand-container">
          <h1>Cooking Legacy</h1>
          {!isSticky && <p className="slogan">Explore, Cook, Devour: Your Recipe Haven.</p>}
        </div>
        <nav className="nav">
          <Link to="/recipes">Recipes</Link>
          <Link to="/recipes/add">Add Recipe</Link>
          {isAuthenticated ? (
            <>
              <Link to={`/users/${user?.id}`}>Profile</Link>
              <a href="#" className="logout-link" onClick={handleLogout}>Logout</a>
            </>
          ) : (
            <Link to="/auth">Sign In</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
