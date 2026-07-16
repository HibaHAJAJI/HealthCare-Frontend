import { Link } from "react-router-dom";
import { FiSearch, FiBell, FiMenu, FiUser } from "react-icons/fi";
import "./Navbar.css";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle-btn" onClick={onToggleSidebar}>
          <FiMenu size={20} />
        </button>

        <Link to="/" className="navbar-brand">
          <div className="brand-logo"></div>
          <span className="brand-name">
            HealthCare<span className="brand-plus">+</span>
          </span>
        </Link>
      </div>

      <div className="navbar-search">
        <FiSearch size={18} className="search-icon" />
        <input
          type="text"
          placeholder="Rechercher un patient, un médecin ou un rendez-vous..."
        />
      </div>

      <div className="navbar-right">
        <button className="nav-icon-btn">
          <FiBell size={20} />
          <span className="notification-badge"></span>
        </button>

        <button className="nav-profile-btn">
          <FiUser size={22} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;