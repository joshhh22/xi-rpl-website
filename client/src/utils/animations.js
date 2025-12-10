// Framer Motion variants centralized

export const pageTransition = {
    initial: {
      opacity: 0,
      y: 24
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: {
      opacity: 0,
      y: -16,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 1, 1]
      }
    }
  };
  
  export const fadeInUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  });
  
  export const scaleIn = (delay = 0) => ({
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay,
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  });
  
  export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  });
  
  export const cardHover = {
    rest: {
      scale: 1,
      boxShadow: '0 18px 45px rgba(15, 20, 25, 0.65)',
      borderColor: 'rgba(148, 163, 184, 0.15)'
    },
    hover: {
      scale: 1.05,
      boxShadow: '0 0 32px rgba(37, 99, 235, 0.6)',
      borderColor: 'rgba(37, 99, 235, 0.8)',
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 18
      }
    }
  };
  