import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

/**
 * UserRow component for displaying user info in admin management.
 * @param {object} props
 * @param {object} props.user - User object with id, name, email, role
 * @param {function} props.onDelete - Callback when delete is clicked, receives user id
 */
function UserRow({ user, onDelete }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-2">
      <div className="flex items-center gap-4">
        <Avatar role={user.role} />
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">{user.name}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
        </div>
      </div>
      <button
        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors text-sm font-medium"
        onClick={() => onDelete(user.id)}
        aria-label={`Delete user ${user.name}`}
        type="button"
      >
        Delete
      </button>
    </div>
  );
}

UserRow.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default UserRow;