import { useState } from "react";
import MobileMenu from './MobileMenu'; // Ajusta la ruta si es necesario

export default function Navbar() {
  // 1. Crear el estado para controlar si el menú está abierto
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 2. Función para alternar el estado (abrir/cerrar)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Función para forzar el cierre del menú (usada por el hijo)
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="navbar newtype">
        <div className="div-block-10">
          <a href="index.html#Hero" className="navbar-brand logoNavM"></a>

          <div className="nav-menu-wrapper-right">
          <nav role="navigation"  className="nav-menu new">
            <div className='nav-buttons-wrapper new' >
              <a href="index.html#About" className='navbartext'>About</a>
              <a href="index.html#Projects" className='navbartext' >Projects</a>
              <a href="index.html#Testimonials" className='navbartext'>Testimonials</a>
              <a href="index.html#contacto" className='navbartext'>Contact</a>
            </div>
          </nav>

          <MobileMenu isOpen={isMenuOpen} onClose={closeMenu}/>

          <button
            className="navbar-toggler" type="button"onClick={toggleMenu} 
            aria-controls="navbarNavDropdown"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          </div>
        </div>
      </div>
    </>
  );
}