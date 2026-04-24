import React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';

/**
 * BlogCard component for displaying a blog post summary in grid/list views.
 * Shows accent border, author avatar, edit/delete controls.
 * @param {object} props
 * @param {object} props.post - { id, title, excerpt, author, createdAt }
 * @param {function} [props.onEdit] - Called with post id when edit is clicked
 * @param {function} [props.onDelete] - Called with post id when delete is clicked
 * @param {string} [props.accentColor] - Tailwind color class for left border (e.g. 'border-blue-500')
 */
function BlogCard({ post, onEdit, onDelete, accentColor }) {
  const { id, title, excerpt, author, createdAt } = post;
  const dateStr = createdAt
    ? new Date(createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : '';

  return (
    <div
      className={`flex flex-col sm:flex-row items-start bg-white dark:bg-gray-800 rounded-lg shadow border-l-4 ${accentColor} p-5 mb-4 transition hover:shadow-lg`}
    >
      <div className="flex-shrink-0 mr-0 sm:mr-6 mb-4 sm:mb-0">
        <Avatar role={author?.role || 'user'} />
      </div>
      <div className="flex-1 w-full">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">{title}</h2>
          <div className="flex gap-1">
            {onEdit && (
              <button
                className="px-2 py-1 rounded text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors text-sm"
                onClick={() => onEdit(id)}
                aria-label="Edit post"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 019 17H7v-2a2 2 0 012-2z" />
                </svg>
              </button>
            )}
            {onDelete && (
              <button
                className="px-2 py-1 rounded text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition-colors text-sm"
                onClick={() => onDelete(id)}
                aria-label="Delete post"
                type="button"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">{excerpt}</div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>{author?.name || 'Unknown Author'}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{dateStr}</span>
        </div>
      </div>
    </div>
  );
}

BlogCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    excerpt: PropTypes.string,
    author: PropTypes.shape({
      name: PropTypes.string,
      role: PropTypes.string,
    }),
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  accentColor: PropTypes.string,
};

BlogCard.defaultProps = {
  onEdit: undefined,
  onDelete: undefined,
  accentColor: 'border-blue-500',
};

export default BlogCard;