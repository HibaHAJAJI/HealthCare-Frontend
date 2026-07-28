import { Link } from "react-router-dom";
import { FaHeartbeat, FaUserCircle } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));

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

      <div className="navbar-right">
        <Link to="/profile" className="profile-btn">
          <FaUserCircle className="profile-icon" />
          <span>{user?.username || "Profil"}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;