import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaUserMd,
  FaCalendarAlt,
  FaFileMedical,
  FaInfoCircle,
} from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt size={18} />,
    },
    {
      name: "Patients",
      path: "/patients",
      icon: <FaUsers size={18} />,
    },
    {
      name: "Médecins",
      path: "/medecins",
      icon: <FaUserMd size={18} />,
    },
    {
      name: "Rendez-vous",
      path: "/rendez-vous",
      icon: <FaCalendarAlt size={18} />,
    },
    {
      name: "Dossiers médicaux",
      path: "/dossiers",
      icon: <FaFileMedical size={18} />,
    },
    {
      name: "À propos",
      path: "/about",
      icon: <FaInfoCircle size={18} />,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
              onClick={onClose}
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;