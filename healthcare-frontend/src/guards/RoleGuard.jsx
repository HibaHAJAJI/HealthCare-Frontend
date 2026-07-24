import { Navigate, Outlet } from "react-router-dom";

const RoleGuard = ({ allowedRoles = [] }) => {
  const userRole = localStorage.getItem("role");

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RoleGuard;