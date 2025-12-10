import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { fadeInUp } from '../../utils/animations';

const FadeIn = ({ children, delay = 0, as = 'div', className = '' }) => {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      variants={fadeInUp(delay)}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </MotionTag>
  );
};

FadeIn.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  as: PropTypes.string,
  className: PropTypes.string
};

export default FadeIn;
