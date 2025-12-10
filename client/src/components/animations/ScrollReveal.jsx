import React from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import useInView from '../../hooks/useInView';
import { fadeInUp } from '../../utils/animations';

const ScrollReveal = ({ children, delay = 0, className = '' }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp(delay)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      className={className}
    >
      {children}
    </motion.div>
  );
};

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  className: PropTypes.string
};

export default ScrollReveal;
