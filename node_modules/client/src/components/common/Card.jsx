import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { cardHover } from '../../utils/animations';

const Card = ({ children, className = '', as = 'div', hover = true }) => {
  const MotionTag = motion[as] || motion.div;

  if (!hover) {
    return (
      <div className={`glass-card ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <MotionTag
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={cardHover}
      className={`glass-card border border-white/5 ${className}`}
    >
      {children}
    </MotionTag>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.string,
  hover: PropTypes.bool
};

export default Card;
