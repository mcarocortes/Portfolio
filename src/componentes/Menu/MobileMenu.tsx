
export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  
  const menuClasses = `collapse collapsado ${isOpen ? 'show' : ''}`;

  return (
    // Usa la clase condicional para mostrar/ocultar el menú
    <div className={menuClasses} id="navbarNav">
      <div className="navbar-nav">
        <a href="index.html#About" className="menuLinktext" onClick={onClose}>
          About
        </a>
        <a href="index.html#Projects" className="menuLinktext" onClick={onClose}>
          Projects
        </a>
        <a href="index.html#Testimonials" className="menuLinktext" onClick={onClose}>
          Testimonials
        </a>
        <a href="index.html#contacto" className="menuLinktext" onClick={onClose}>
          Contact
        </a>
      </div>
    </div>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}