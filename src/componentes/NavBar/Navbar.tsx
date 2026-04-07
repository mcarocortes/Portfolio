import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Accessibility from "../Accessibility/Accessibility";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [hidden, setHidden] = useState<boolean>(false);
  const location = useLocation();

  const lastScroll = useRef<number>(0);
  const ticking = useRef<boolean>(false);

const toggleMenu = () => {
  setIsMenuOpen(prev => !prev);
};

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const updateScroll = () => {
      const currentScroll = window.scrollY;

      if (Math.abs(currentScroll - lastScroll.current) < 10) {
        ticking.current = false;
        return;
      }

      if (currentScroll > lastScroll.current && currentScroll > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScroll.current = currentScroll;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScroll);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


useEffect(() => {
  closeMenu();
}, [location]);

  return (
    <>
      <div className={`navbar ${hidden ? "navbar-hidden" : ""}`}>
        <div className="bg-navbar">
          <Link to="#Home" className="navbar-brand logoNavM" />
          

          <div className="nav-menu-wrapper-right">
            <nav className="nav-menu new">
              <div className="nav-buttons-wrapper new">
                <Link to="/#About" className="navbartext">ABOUT</Link>
                <Link to="/#Projects" className="navbartext">PROJECTS</Link>
                <Link to="/#WhatIDo" className="navbartext">WHAT I DO</Link>
                <Link to="/#Contact" className="navbartext btnContact">CONTACT</Link>
                <Accessibility />
              </div>
            </nav>

<button
  className={`navbar-toggler custom-toggler ${isMenuOpen ? "open" : ""}`}
  onClick={(e) => {
    e.stopPropagation();
    toggleMenu();
  }}
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