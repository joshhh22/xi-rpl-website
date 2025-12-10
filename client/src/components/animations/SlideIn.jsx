import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { slideIn } from '../../utils/animations';

const SlideIn = ({ children, direction = 'up', delay = 0, className = '' }) => (
  <motion.div
    variants={slideIn(direction, delay)}
    initial="hidden"
    animate="visible"
    className={className}
  >
    {children}
  </motion.div>
);

SlideIn.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  delay: PropTypes.number,
  className: PropTypes.string
};

export default SlideIn;
