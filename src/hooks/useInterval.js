import { useEffect } from 'react';

/**
 * Custom hook for running a callback at regular intervals
 * Automatically cleans up on unmount
 */
export const useInterval = (callback, delay) => {
  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(callback, delay);

    return () => clearInterval(id);
  }, [callback, delay]);
};

export default useInterval;
