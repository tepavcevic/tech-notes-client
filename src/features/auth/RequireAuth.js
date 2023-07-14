import { useLocation, Outlet, Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';

export default function RequireAuth({ allowedRoles }) {
  const location = useLocation();
  const { roles } = useAuth();

  return roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}
