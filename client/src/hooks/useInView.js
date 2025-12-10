import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook to detect when element is in viewport.
 * Threshold default 0.1. Trigger once by default.
 */
const useInView = (options = { threshold: 0.1, triggerOnce: true }) => {
  const { threshold = 0.1, triggerOnce = true } = options;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setInView(false);
        }
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, triggerOnce]);

  return [ref, inView];
};

export default useInView;
