import { Link } from "react-router-dom";
import { FiSearch, FiBell, FiMenu, FiPlus } from "react-icons/fi";
import "./Navbar.css";

const Navbar = ({ onToggleSidebar }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="menu-toggle-btn"
          onClick={onToggleSidebar}
        >
          <FiMenu size={20} />
        </button>

        <Link to="/dashboard" className="navbar-brand">
          <div className="brand-logo">
            <FiPlus size={16} />
          </div>

          <span className="brand-name">
            HealthCare<span className="brand-plus">+</span>
          </span>
        </Link>
      </div>

      <div className="navbar-right">
        <FiSearch className="navbar-icon" size={18} />

        <FiBell className="navbar-icon" size={18} />

        <img
          src="https://i.pravatar.cc/40"
          alt="Avatar"
          className="navbar-avatar"
        />
      </div>
    </nav>
  );
};

export default Navbar;