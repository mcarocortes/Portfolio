import './Navbar.css';
import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from "react";

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {

  const menuClasses = `collapse collapsado ${isOpen ? 'show' : ''}`;

  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

const toggleDarkMode = () => {
  const newMode = !darkMode;

  setDarkMode(newMode);

  document.body.classList.toggle("dark-mode");

  localStorage.setItem("darkMode", String(newMode));
};

  const increaseText = () => {
    document.documentElement.style.fontSize = "20px";
  };

  const decreaseText = () => {
    document.documentElement.style.fontSize = "14px";
  };

  const defaultText = () => {
    document.documentElement.style.fontSize = "18px";
  };

  useEffect(() => {
    if (!isOpen) {
      setAccessibilityOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        onClose();
      }

      lastScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [onClose]);


useEffect(() => {
  if (!isOpen) return;

  const handleClickOutside = (event: MouseEvent) => {
    if (!menuRef.current) return;

    if (!menuRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  document.addEventListener("click", handleClickOutside);

  return () => document.removeEventListener("click", handleClickOutside);
}, [isOpen, onClose]);


useEffect(() => {
  const saved = localStorage.getItem("darkMode");

  if (saved === "true") {
    setDarkMode(true);
    document.body.classList.add("dark-mode");
  }
}, []);

  return (
    <div ref={menuRef} className={menuClasses} id="navbarNav">
      <div className="navbar-nav">
        <Link to="/#About" className="menuLinktext" onClick={onClose}>About</Link>
        <hr />
        <Link to="/#Projects" className="menuLinktext" onClick={onClose}>Projects</Link>
        <hr />
        <Link to="/#WhatIDo" className="menuLinktext" onClick={onClose}>What I Do</Link>
        <Link to="/#Contact" className="menuLinktext btnContact" onClick={onClose}>Contact</Link>
        <button
          className="menuLinktext accessibility-button"
          onClick={(e) => {e.stopPropagation();
            setAccessibilityOpen(!accessibilityOpen);
          }}
        >
          <i className="bi bi-universal-access"></i>
        </button>
      </div>
      {accessibilityOpen && (
        <div className="accessibilityMobile">

          <p>ACCESSIBILITY</p>

          <div>
            <p className='mb-3'>Dark mode</p>

            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                checked={darkMode}
                onChange={toggleDarkMode}
              />
            </div>
          </div>

          <div>
            <div className="d-flex mb-3">
              <p className='m-0'>Text size |</p>
              <button className="defaultText p-0 " onClick={defaultText}>Default text</button>
            </div>
            <div>
              <button
                className="btn me-2"
                onClick={decreaseText}
              >
                A−
              </button>

              <button
                className="btn"
                onClick={increaseText}
              >
                A+
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}