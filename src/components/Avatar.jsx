import React from 'react';
import PropTypes from 'prop-types';

/**
 * Returns a styled avatar JSX element based on the provided role.
 * @param {string} role - The user's role (e.g., 'admin', 'editor', 'user').
 * @returns {JSX.Element} The avatar element.
 */
export function getAvatar(role) {
  let bg = '';
  let icon = '';
  let label = '';
  switch (role) {
    case 'admin':
      bg = 'bg-red-500';
      icon = (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 2c-2.67 0-8 1.337-8 4v2h16v-2c0-2.663-5.33-4-8-4z" />
        </svg>
      );
      label = 'Admin';
      break;
    case 'editor':
      bg = 'bg-blue-500';
      icon = (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 019 17H7v-2a2 2 0 012-2z" />
        </svg>
      );
      label = 'Editor';
      break;
    case 'user':
    default:
      bg = 'bg-gray-400';
      icon = (
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A9 9 0 1112 21a9 9 0 01-6.879-3.196z" />
        </svg>
      );
      label = 'User';
      break;
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full ${bg} text-white text-sm font-medium gap-2`}>
      <span>{icon}</span>
      {label}
    </span>
  );
}

/**
 * Avatar component for rendering a role-based avatar.
 * @param {object} props
 * @param {string} props.role
 */
function Avatar({ role }) {
  return getAvatar(role);
}

Avatar.propTypes = {
  role: PropTypes.string.isRequired,
};

export default Avatar;