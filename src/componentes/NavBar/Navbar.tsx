import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import AccessibilityPanel from "../Accessibility/AccessibilityPanel";
import "./Navbar.css";

import useNavbarScroll from "../../hooks/useNavbarScroll";
import useActiveSection from "../../hooks/useActiveSection";
import useCloseOnRouteChange from "../../hooks/useOnRouterChange";
import { scrollToTop, handleSectionLinkClick } from "../../lib/smoothScroll";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false); //hamburger open or close
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);

  /* Hooks*/
  const hidden = useNavbarScroll(); //Desaparecer navbar con scroll
  const activeSection = useActiveSection(); // Destacar currentLink
  const { t } = useTranslation();
  const location = useLocation();

  /* FUNCTIONS */
  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
    setAccessibilityOpen(false); // al abrir/cerrar menú, accesibilidad off
  };


  const toggleAccessibility = () => {
    setAccessibilityOpen(prev => !prev);
    setMenuOpen(false); // al abrir/cerrar accesibilidad, menú off
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

          <Link
            to="/#Home"
            className="navbar-brand logoNavM"
            onClick={(event) => {
              if (location.pathname !== "/") return;
              event.preventDefault();
              scrollToTop();
              window.history.replaceState(null, "", "#Home");
            }}
          />
          <div className="nav-menu-wrapper-right">

            <nav className="nav-menu new">
              <div className="nav-buttons-wrapper new">

                <Link
                  to="/#About"
                  className={`navbartext ${activeSection === "About" ? "active" : ""}`}
                  title={t("about")}
                  onClick={(event) => handleSectionLinkClick(event, "#About", location.pathname)}
                >
                  {t("about")}
                </Link>
                <Link
                  to="/#Evolution"
                  className={`navbartext ${activeSection === "Evolution" ? "active" : ""}`}
                  title={t("evolution")}
                  onClick={(event) => handleSectionLinkClick(event, "#Evolution", location.pathname)}
                >{t("evolution")}</Link>
                <Link
                  to="/#WhatIDo"
                  className={`navbartext ${activeSection === "WhatIDo" ? "active" : ""}`}
                  title={t("whatido")}
                  onClick={(event) => handleSectionLinkClick(event, "#WhatIDo", location.pathname)}
                >{t("whatido")}</Link>
                <Link
                  to="/#Projects"
                  className={`navbartext ${activeSection === "Projects" ? "active" : ""}`}
                  title={t("projects")}
                  onClick={(event) => handleSectionLinkClick(event, "#Projects", location.pathname)}
                >{t("projects")}</Link>
                <Link
                  to="/#Contact"
                  className={`navbartext btnContact ${activeSection === "Contact" ? "active" : ""}`}
                  title={t("contact")}
                  onClick={(event) => handleSectionLinkClick(event, "#Contact", location.pathname)}
                >{t("contact")}</Link>
              </div>
            </nav>

            <button
              className={`navbar-toggler custom-toggler ${menuOpen ? "open" : ""}`}

              onMouseDown={(e) => {
                e.stopPropagation();//evita que el click se propague al documento
              }}
              onClick={toggleMenu}
              aria-expanded={menuOpen}//Le dice a screen readers si está abierto.
              aria-label="Toggle navigation"
            >
              <div className="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
            <button
              className="navbartext accessibility-button"
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
                toggleAccessibility();
              }}
            >
              <i className="bi bi-universal-access"></i>
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

      <AccessibilityPanel
        open={accessibilityOpen}
        setOpen={setAccessibilityOpen}
        //variant="desktop"
        hidden={hidden}
      />
    </>
  );
}