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
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const { logout ,user} = useAuth();
  console.log(user);
  

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

  const handleLogout = () => {
    if (onClose) onClose();
    logout();
  };

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
        />
      )}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-container">
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

          <div className="sidebar-footer">
            <button className="sidebar-link logout-btn" onClick={handleLogout}>
              <FaSignOutAlt size={18} />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;