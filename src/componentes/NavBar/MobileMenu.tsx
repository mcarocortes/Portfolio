import { Link, useLocation } from "react-router-dom";
import { useRef, type MouseEvent } from "react";
import "./Navbar.css";
import useClickOutside from "../../hooks/useClickOutside";
import { handleSectionLinkClick } from "../../lib/smoothScroll";
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
  const location = useLocation();

  const onSectionClick = (event: MouseEvent<HTMLAnchorElement>, hash: string) => {
    handleSectionLinkClick(event, hash, location.pathname, onClose);
  };


  /* Handle Click Outside Menu */
  useClickOutside(menuRef, onClose, isOpen);


  return (
    <div ref={menuRef} className={`${menuClasses} ${hidden ? "navbar-hidden" : ""}`}>

      <div className="navbar-nav">

<Link
  to="/#About"
  className="menuLinktext"
  onClick={(event) => onSectionClick(event, "#About")}
>
  {t("about")}
</Link>
        <hr />
        <Link
          to="/#Evolution"
          className="menuLinktext"
          onClick={(event) => onSectionClick(event, "#Evolution")}
        >{t("evolution")}</Link>
   <hr />
   
        <Link
          to="/#WhatIDo"
          className="menuLinktext"
          onClick={(event) => onSectionClick(event, "#WhatIDo")}
        >{t("whatido")}</Link>
 <hr />
        <Link
          to="/#Projects"
          className="menuLinktext"
          onClick={(event) => onSectionClick(event, "#Projects")}
        >{t("projects")}</Link>

        <Link
          to="/#Contact"
          className="menuLinktext btnContact"
          onClick={(event) => onSectionClick(event, "#Contact")}
        >{t("contact")}</Link>
      </div>
    </div>
  );
}