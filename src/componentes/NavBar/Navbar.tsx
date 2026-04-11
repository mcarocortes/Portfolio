import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import AccessibilityPanel from "../Accessibility/AccessibilityPanel";
import "./Navbar.css";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false); //hamburger open or close
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [hidden, setHidden] = useState(false); //navbar hidden or visible

  /* Hooks de navegación */
  const location = useLocation();//URL actual
  const lastScroll = useRef(0);//last scroll position
  const ticking = useRef(false);//Optimización de performance,evita que el scroll se ejecute demasiadas veces.

  /* FUNCTIONS */
  //si estaba abierto: ciérralo, si estaba cerrado: ábrelo
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  //Close
  const closeMenu = () => {
    setMenuOpen(false);
  };

  //si estaba abierto: ciérralo, si estaba cerrado: ábrelo
  const toggleAccessibility = () => {
    setAccessibilityOpen(prev => !prev);
  };

  //cuando el componente se monte, ejecuta esto
  useEffect(() => {

    /* Hide or Show navbar. */
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

    window.addEventListener("scroll", handleScroll); //Cada vez que se hace scroll,ejecuta handleScroll.

    return () => window.removeEventListener("scroll", handleScroll);//cuando el componente desaparezca quitar el listener
  }, []);

  /*Close menu, everytime the pageChange */
  useEffect(() => {
    closeMenu();
  }, [location]);


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

                <Link to="/#About" className="navbartext">ABOUT</Link>
                <Link to="/#Projects" className="navbartext">PROJECTS</Link>
                <Link to="/#WhatIDo" className="navbartext">WHAT I DO</Link>
                <Link to="/#Contact" className="navbartext btnContact">CONTACT</Link>

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