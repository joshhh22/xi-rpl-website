import React from 'react';
import PropTypes from 'prop-types';

const variants = {
  default: 'bg-white/5 text-text',
  success: 'bg-accent-green/15 text-accent-green border border-accent-green/50',
  warning: 'bg-state-warning/15 text-state-warning border border-state-warning/50',
  error: 'bg-state-error/15 text-state-error border border-state-error/50',
  info: 'bg-primary/15 text-primary border border-primary/40',
  purple: 'bg-accent-purple/15 text-accent-purple border border-accent-purple/50'
};

const Badge = ({ children, variant = 'default', className = '' }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${variants[variant]} ${className}`}
  >
    {children}
  </span>
);

Badge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'default',
    'success',
    'warning',
    'error',
    'info',
    'purple'
  ]),
  className: PropTypes.string
};

export default Badge;
