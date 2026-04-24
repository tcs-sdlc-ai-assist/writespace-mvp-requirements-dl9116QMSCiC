import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { isLoggedIn, getCurrentUser } from '../utils/auth';

/**
 * ProtectedRoute component for guarding routes based on authentication and role.
 * @param {object} props
 * @param {React.ReactNode} props.children - The content to render if allowed
 * @param {string|string[]} [props.requiredRole] - Role or roles allowed to access
 */
function ProtectedRoute({ children, requiredRole }) {
  const location = useLocation();
  const loggedIn = isLoggedIn();
  const user = getCurrentUser();

  if (!loggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!user || !roles.includes(user.role)) {
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
  }

  return <>{children}</>;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiredRole: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default ProtectedRoute;