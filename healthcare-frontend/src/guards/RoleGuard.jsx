import { Navigate, Outlet } from "react-router-dom";

const RoleGuard = ({ allowedRoles = [] }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default RoleGuard;