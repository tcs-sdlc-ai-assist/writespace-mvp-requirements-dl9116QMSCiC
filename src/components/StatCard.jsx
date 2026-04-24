import React from 'react';
import PropTypes from 'prop-types';

function StatCard({ icon, label, value, color }) {
  return (
    <div className={`flex items-center p-4 rounded-lg shadow bg-white dark:bg-gray-800`}>
      <div className={`flex items-center justify-center w-12 h-12 rounded-full ${color} bg-opacity-20 mr-4`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  color: PropTypes.string, // e.g., 'bg-blue-500'
};

StatCard.defaultProps = {
  color: 'bg-blue-500',
};

export default StatCard;