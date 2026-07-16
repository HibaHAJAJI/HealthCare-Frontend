import { NavLink } from "react-router-dom";
import './Sidebar.css';
import {
  LayoutDashboard,
  Users,
  UserRound,
  CalendarDays,
  FileText,
  Info,
  LogOut,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    {
      name: "Tableau de bord",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Patients",
      path: "/patients",
      icon: <Users size={20} />,
    },
    {
      name: "Médecins",
      path: "/doctors",
      icon: <UserRound size={20} />,
    },
    {
      name: "Rendez-vous",
      path: "/appointments",
      icon: <CalendarDays size={20} />,
    },
    {
      name: "Dossiers médicaux",
      path: "/medical-records",
      icon: <FileText size={20} />,
    },
    {
      name: "À propos",
      path: "/about",
      icon: <Info size={20} />,
    },
  ];

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose}></div>
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

        <div className="sidebar-footer">
          <button className="logout-btn">
            <LogOut size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;