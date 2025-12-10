import React from 'react';
import PropTypes from 'prop-types';

const baseClasses =
  'inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background';

const variants = {
  primary:
    'bg-primary text-white hover:bg-primary-soft shadow-soft-card hover:shadow-glow-blue',
  secondary:
    'bg-white/5 text-text hover:bg-white/10 border border-white/10',
  ghost: 'bg-transparent text-text-muted hover:bg-white/5'
};

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  className: PropTypes.string
};

export default Button;
