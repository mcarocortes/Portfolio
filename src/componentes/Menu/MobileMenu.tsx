
import { Link } from 'react-router-dom'

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  
  const menuClasses = `collapse collapsado ${isOpen ? 'show' : ''}`;

  return (
    <div className={menuClasses} id="navbarNav">
      <div className="navbar-nav">
        <Link to="/Portfolio#About"className="menuLinktext"onClick={onClose}>About</Link>
        <Link to="/Portfolio#Projects"className="menuLinktext"onClick={onClose}>Projects</Link>
        <Link to="/Portfolio#Testimonials"className="menuLinktext"onClick={onClose}>Testimonials</Link>
        <Link to="/Portfolio#Contact"className="menuLinktext"onClick={onClose}>Contact</Link>
      </div>
    </div>
  );
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}