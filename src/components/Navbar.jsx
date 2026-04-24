import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, isAdmin, isEditor } from '../utils/auth';
import Avatar from './Avatar';

function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const user = getCurrentUser();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          className="text-xl font-bold text-blue-600 dark:text-blue-400 tracking-tight"
          onClick={() => navigate('/')}
          aria-label="Go to home"
          type="button"
        >
          writespace
        </button>
        <div className="hidden sm:flex items-center gap-2">
          <button
            className="px-3 py-1 rounded hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
            onClick={() => navigate('/dashboard')}
            type="button"
          >
            Dashboard
          </button>
          <button
            className="px-3 py-1 rounded hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
            onClick={() => navigate('/documents')}
            type="button"
          >
            Documents
          </button>
          {(isAdmin() || isEditor()) && (
            <button
              className="px-3 py-1 rounded hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium"
              onClick={() => navigate('/admin')}
              type="button"
            >
              Admin
            </button>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline">
          <Avatar role={user.role} />
        </span>
        <span className="text-gray-700 dark:text-gray-200 text-sm font-medium hidden md:inline">
          {user.username}
        </span>
        <button
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors text-sm font-medium"
          onClick={handleLogout}
          aria-label="Logout"
          type="button"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  onLogout: PropTypes.func,
};

export default Navbar;