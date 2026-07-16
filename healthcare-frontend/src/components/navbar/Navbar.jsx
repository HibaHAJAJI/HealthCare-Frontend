import { Link } from "react-router-dom";
import {Search , Bell, Menu } from "react-icons";
import'/Navbar.css';

const Navbar =({onToggleSidebar})=>{
    return (
        <nav className="navbar">
            <div className="nanbar-left">
                <button className="menu-toggle-btn" onClick={onToggleSidebar}>
                    <Menu size={20}/>
                </button>
                <Link to="/" className="navbar-brand">
                   <div className="brand-logo"></div>
                   <span className="brand-name">HealthCare<span className="brand-plus">+</span></span>
                </Link>
            </div>

            <div className="navbar-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Rechercher un patient, rdv..." />
      </div>

      <div className="navbar-right">
        <button className="nav-icon-btn">
          <Bell size={20} />
          <span className="notification-badge"></span>
        </button>
        <div className="nav-profile">
          <img 
            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150" 
            alt="Dr. Sarah Johnson" 
            className="avatar" 
          />
          <div className="profile-info">
            <span className="profile-name">Dr. Sarah Johnson</span>
            <span className="profile-role">Médecin Chef</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
