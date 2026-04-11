import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import AccessibilityPanel from "../Accessibility/AccessibilityPanel";
import "./Navbar.css";

import useNavbarScroll from "../../hooks/useNavbarScroll";
import useActiveSection from "../../hooks/useActiveSection";
import useCloseOnRouteChange from "../../hooks/useOnRouterChange";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false); //hamburger open or close
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  /* Hooks*/
  const hidden = useNavbarScroll(); //Desaparecer navbar con scroll
  const activeSection = useActiveSection(); // Destacar currentLink

  /* FUNCTIONS */
  //si estaba abierto: ciérralo, si estaba cerrado: ábrelo
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  //si estaba abierto: ciérralo, si estaba cerrado: ábrelo
  const toggleAccessibility = () => {
    setAccessibilityOpen(prev => !prev);
  };

  //Close
  const closeMenu = () => {
    setMenuOpen(false);
  };

  useCloseOnRouteChange(closeMenu); //Hook: Close menu, everytime the pageChange 

  /* Si se esconde el NavBar, los desplegables se cierran */
  useEffect(() => {
    if (hidden) {
      setMenuOpen(false);
      setAccessibilityOpen(false);
    }
  }, [hidden]);


  return (
    <>
      <div className={`navbar ${hidden ? "navbar-hidden" : ""}`}>
        <div className="bg-navbar">

          <Link to="#Home" className="navbar-brand logoNavM" />

          <div className="nav-menu-wrapper-right">

            <nav className="nav-menu new">
              <div className="nav-buttons-wrapper new">

                <Link to="/#About" className={`navbartext ${activeSection === "About" ? "active" : ""}`}>ABOUT</Link>
                <Link to="/#Projects" className={`navbartext ${activeSection === "Projects" ? "active" : ""}`}>PROJECTS</Link>
                <Link to="/#WhatIDo" className={`navbartext ${activeSection === "WhatIDo" ? "active" : ""}`}>WHAT I DO</Link>
                <Link to="/#Contact" className={`navbartext btnContact ${activeSection === "Contact" ? "active" : ""}`}>CONTACT</Link>

                <button
                  className="navbartext accessibility-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleAccessibility();
                  }}
                >
                  <i className="bi bi-universal-access"></i>
                </button>
              </div>
            </nav>

            <button
              className={`navbar-toggler custom-toggler ${menuOpen ? "open" : ""}`}
              onClick={(e) => {
                e.stopPropagation();//evita que el click se propague al documento
                toggleMenu();
              }}
              aria-expanded={menuOpen}//Le dice a screen readers si está abierto.
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

      <MobileMenu
        isOpen={menuOpen} //estado
        onClose={closeMenu} //funcion
        accessibilityOpen={accessibilityOpen}
        setAccessibilityOpen={setAccessibilityOpen}
        hidden={hidden}
      />

      {!menuOpen && ( //solo muestra el panel si el menú mobile está cerrado
        <AccessibilityPanel
          open={accessibilityOpen}
          setOpen={setAccessibilityOpen}
          variant="desktop"
          hidden={hidden}
        />
      )}
    </>
  );
}