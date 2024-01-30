import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

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
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="#">Blog</Link>
              </li>
              <li>
                <Link to="#">Work</Link>
              </li>
              <li>
                <Link to="#">About</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
