import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { hasRole } from '../utils/roleUtils';

/**
 * Guard for checking role-based authorizations.
 */
const RoleGuard = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user || !hasRole(user, allowedRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleGuard;
