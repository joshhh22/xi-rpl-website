import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { scaleIn } from '../../utils/animations';

const ScaleIn = ({ children, delay = 0, className = '' }) => (
  <motion.div
    variants={scaleIn(delay)}
    initial="hidden"
    animate="visible"
    className={className}
  >
    {children}
  </motion.div>
);

ScaleIn.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  className: PropTypes.string
};

export default ScaleIn;
