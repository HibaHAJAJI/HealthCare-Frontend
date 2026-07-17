import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserMd,
  FaCalendarAlt,
  FaFileMedical,
  FaInfoCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      name: "Tableau de bord",
      path: "/dashboard",
      icon: <FaTachometerAlt size={20} />,
    },
    {
      name: "Patients",
      path: "/patients",
      icon: <FaUsers size={20} />,
    },
    {
      name: "Médecins",
      path: "/doctors",
      icon: <FaUserMd size={20} />,
    },
    {
      name: "Rendez-vous",
      path: "/appointments",
      icon: <FaCalendarAlt size={20} />,
    },
    {
      name: "Dossiers médicaux",
      path: "/medical-records",
      icon: <FaFileMedical size={20} />,
    },
    {
      name: "À propos",
      path: "/about",
      icon: <FaInfoCircle size={20} />,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        ></div>
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
              onClick={onClose}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn">
            <FaSignOutAlt size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;