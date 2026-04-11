import { Link } from "react-router-dom"; //Navegar sin recargar la página.
import AccessibilityPanel from "../Accessibility/AccessibilityPanel";
import { useRef } from "react";
import "./Navbar.css";

import useClickOutside from "../../hooks/useClickOutside"

/* Propiedades recibe el componente*/
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void; //una función que no recibe nada y no devuelve nada
  accessibilityOpen: boolean;
  setAccessibilityOpen: (value: boolean) => void; //Esto es la función que cambia ese estado
  hidden: boolean;
}

export default function MobileMenu({ isOpen, onClose, accessibilityOpen, setAccessibilityOpen, hidden }: MobileMenuProps) {

  const menuRef = useRef<HTMLDivElement>(null);
  const menuClasses = `collapse collapsado ${isOpen ? "show" : ""}`; //clase dinámica.

  /* Handle Click Outside Menu */
  useClickOutside(menuRef, onClose, isOpen);


  return (
    <div ref={menuRef} className={`${menuClasses} ${hidden ? "navbar-hidden" : ""}`}>

      <div className="navbar-nav">

        <Link to="/#About" className="menuLinktext" onClick={onClose}>About</Link>
        <hr />

        <Link to="/#Projects" className="menuLinktext" onClick={onClose}>Projects</Link>
        <hr />

        <Link to="/#WhatIDo" className="menuLinktext" onClick={onClose}>What I Do</Link>

        <Link to="/#Contact" className="menuLinktext btnContact" onClick={onClose}>Contact</Link>

        <button
          className="menuLinktext accessibility-button"
          onClick={(e) => {
            e.stopPropagation();
            setAccessibilityOpen(!accessibilityOpen);
          }}
        >
          <i className="bi bi-universal-access"></i>
        </button>

      </div>
      <AccessibilityPanel open={accessibilityOpen} setOpen={setAccessibilityOpen} variant="mobile" />

    </div>
  );
}