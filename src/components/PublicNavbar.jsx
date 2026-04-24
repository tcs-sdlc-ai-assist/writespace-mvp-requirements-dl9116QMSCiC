import React from 'react';
import { Link, useLocation } from 'react-router-dom';

/**
 * PublicNavbar component for unauthenticated users.
 * Shows logo, navigation links, and login/register buttons.
 */
function PublicNavbar() {
  const location = useLocation();

  return (
    <nav className="w-full bg-white dark:bg-gray-900 shadow px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Link to="/" className="flex items-center gap-2">
          <svg
            className="w-7 h-7 text-blue-600 dark:text-blue-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <rect x="4" y="4" width="16" height="16" rx="4" />
            <path d="M8 8h8M8 12h8M8 16h4" strokeLinecap="round" />
          </svg>
          <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">writespace</span>
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <Link
          to="/"
          className={`text-sm font-medium transition-colors ${
            location.pathname === '/'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          Home
        </Link>
        <Link
          to="/about"
          className={`text-sm font-medium transition-colors ${
            location.pathname === '/about'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          About
        </Link>
        <Link
          to="/features"
          className={`text-sm font-medium transition-colors ${
            location.pathname === '/features'
              ? 'text-blue-600 dark:text-blue-400'
              : 'text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400'
          }`}
        >
          Features
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Link
          to="/login"
          className="px-4 py-1.5 rounded font-medium text-sm bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors"
        >
          Log in
        </Link>
        <Link
          to="/register"
          className="px-4 py-1.5 rounded font-medium text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Register
        </Link>
      </div>
    </nav>
  );
}

export default PublicNavbar;