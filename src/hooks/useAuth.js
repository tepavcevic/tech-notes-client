import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { selectCurrentToken } from '../features/auth/authSlice';

export default function useAuth() {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = 'Employee';

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    isManager = roles.includes('Manager');
    isAdmin = roles.includes('Admin');

    if (isManager) {
      status = 'Manager';
    }
    if (isAdmin) {
      status = 'Admin';
    }

    return { username, roles, isManager, isAdmin, status };
  }

  return { username: '', roles: [], isManager, isAdmin, status };
}
