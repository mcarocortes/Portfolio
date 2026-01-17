import { useState } from "react";
import MobileMenu from './MobileMenu';
import './Navbar.css';
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="navbar newtype">
        <div className="div-block-10">
          <Link to="#Home" className="navbar-brand logoNavM" aria-label="Go to home">
          </Link>

          <div className="nav-menu-wrapper-right">
            <nav role="navigation" className="nav-menu new">
              <div className='nav-buttons-wrapper new' >
                <Link to="/#About" className="navbartext">About</Link>
                <Link to="/#Projects" className="navbartext">Projects</Link>
                <Link to="/#WhatIDo" className="navbartext">What I Do</Link>
                <Link to="/#Contact" className="navbartext">Contact</Link>
              </div>
            </nav>


            <button
              className={`navbar-toggler custom-toggler ${isMenuOpen ? 'open' : ''}`}
              type="button"
              onClick={toggleMenu}
              aria-controls="navbarNavDropdown"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation"
            >
              <div className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </div>
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu} />

    </>
  );
}