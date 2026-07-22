import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/dashboard" className="navbar-brand">
          <FaHeartbeat className="health-icon" />

          <span className="brand-name">
            HealthCare<span className="brand-plus">+</span>
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;