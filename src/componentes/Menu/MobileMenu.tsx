
export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  
  const menuClasses = `collapse collapsado ${isOpen ? 'show' : ''}`;

  return (
    <div className={menuClasses} id="navbarNav">
      <div className="navbar-nav">
        <a href="#About" className="menuLinktext" onClick={onClose}>
          About
        </a>
        <a href="#Projects" className="menuLinktext" onClick={onClose}>
          Projects
        </a>
        <a href="#Testimonials" className="menuLinktext" onClick={onClose}>
          Testimonials
        </a>
        <a href="#Contacto" className="menuLinktext" onClick={onClose}>
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