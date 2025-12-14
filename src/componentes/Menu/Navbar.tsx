import { useState } from "react";
import MobileMenu from './MobileMenu';
import './Navbar.css'; 


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
          <a href="#Home" className="navbar-brand logoNavM"></a>

          <div className="nav-menu-wrapper-right">
          <nav role="navigation"  className="nav-menu new">
            <div className='nav-buttons-wrapper new' >
              <a href="#About" className='navbartext'>About</a>
              <a href="#Projects" className='navbartext' >Projects</a>
              <a href="#Testimonials" className='navbartext'>Testimonials</a>
              <a href="#Contact" className='navbartext'>Contact</a>
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
      <MobileMenu isOpen={isMenuOpen} onClose={closeMenu}/>

    </>
  );
}