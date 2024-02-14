import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <>
      <div className="menu-container">
        <button className={`toggle-menu ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
        </button>
        <header id="header">
          <nav className="nav">
          </nav>
        </header>

        <div id="menu" className={isMenuOpen ? 'open' : ''}>
          <nav className="main-nav">
            <ul>
              <li>
                <Link to="/" onClick={() => setIsMenuOpen(false)}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/recipes" onClick={() => setIsMenuOpen(false)}>
                  Recipes
                </Link>
              </li>
              <li>
                <Link to="/recipes/add" onClick={() => setIsMenuOpen(false)}>
                  Add Recipe
                </Link>
              </li>
              <li>
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  Sign In
                </Link>
                <Link to="/logout" onClick={() => setIsMenuOpen(false)}>
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
