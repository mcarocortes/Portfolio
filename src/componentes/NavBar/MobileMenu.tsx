import { Link } from "react-router-dom"; //Navegar sin recargar la página.
//import AccessibilityPanel from "../Accessibility/AccessibilityPanel";
import { useRef } from "react";
import "./Navbar.css";
import useClickOutside from "../../hooks/useClickOutside"
import { useTranslation } from "react-i18next";


/* Propiedades recibe el componente*/
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void; //una función que no recibe nada y no devuelve nada
  accessibilityOpen: boolean;
  setAccessibilityOpen: (value: boolean) => void; //Esto es la función que cambia ese estado
  hidden: boolean;
}

export default function MobileMenu({ isOpen, onClose, /*accessibilityOpen, setAccessibilityOpen,*/ hidden }: MobileMenuProps) {

  const menuRef = useRef<HTMLDivElement>(null);
  const menuClasses = `collapse collapsado ${isOpen ? "show" : ""}`; //clase dinámica.

  /* HOOKS*/
  const { t } = useTranslation();


  /* Handle Click Outside Menu */
  useClickOutside(menuRef, onClose, isOpen);


  return (
    <div ref={menuRef} className={`${menuClasses} ${hidden ? "navbar-hidden" : ""}`}>

      <div className="navbar-nav">

<Link
  to="/#About"
  className="menuLinktext"
  onClick={() => {
    onClose();
    document.getElementById("About")?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", "#About");
  }}
>
  {t("about")}
</Link>
        <hr />

        <Link to="/#Projects" className="menuLinktext"   onClick={() => {
    onClose();
    document.getElementById("Projects")?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", "#Projects");
  }}>{t("projects")}</Link>
        <hr />

        <Link to="/#WhatIDo" className="menuLinktext"   onClick={() => {
    onClose();
    document.getElementById("WhatIDo")?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", "#WhatIDo");
  }}>{t("whatido")}</Link>

        <Link to="/#Contact" className="menuLinktext btnContact"   onClick={() => {
    onClose();
    document.getElementById("Contact")?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", "#Contact");
  }}>{t("contact")}</Link>
      </div>
    </div>
  );
}