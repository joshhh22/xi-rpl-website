import { useEffect, useState } from 'react';

/**
 * Simple counter animation hook.
 * Counts from 0 to target value in given duration.
 */
const useCounter = (target = 0, duration = 1000, shouldStart = true) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldStart || target === 0) return;

    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);
      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    const frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [target, duration, shouldStart]);

  return value;
};

export default useCounter;
