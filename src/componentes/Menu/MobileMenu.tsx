import './Navbar.css';
import { Link } from 'react-router-dom'

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  
  const menuClasses = `collapse collapsado ${isOpen ? 'show' : ''}`;

  return (
    <div className={menuClasses} id="navbarNav">
      <div className="navbar-nav">
        <Link to="/#About"className="menuLinktext"onClick={onClose}>About</Link>
        <Link to="/#Projects"className="menuLinktext"onClick={onClose}>Projects</Link>
        <Link to="/#WhatIDo" className="menuLinktext"onClick={onClose}>What I Do</Link>
        <Link to="/#Contact"className="menuLinktext"onClick={onClose}>Contact</Link>
      </div>
    </div>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}