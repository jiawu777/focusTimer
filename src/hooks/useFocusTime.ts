import { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { timerStateAtom, isRunning } from '@/atoms/taskAtoms';
import pathname from '@/router/Router';

const useFocusTime = () => {
  const [focusTime, setFocusTime] = useState<number>(0);
  const focusRef = useRef<NodeJS.Timeout | null>(null);
  const state = useAtomValue(timerStateAtom);
  const running = useAtomValue(isRunning);

  const isOnFocusPage = () => pathname.some((route) => window.location.pathname === route.path);

  // Helper to clear interval
  const clearFocusInterval = () => {
    if (focusRef.current) {
      clearInterval(focusRef.current);
      focusRef.current = null;
    }
  };

  useEffect(() => {
    function checkAndStart() {
      if (
        document.visibilityState === 'visible' &&
        isOnFocusPage() &&
        state === 'work' &&
        running
      ) {
        if (!focusRef.current) {
          focusRef.current = setInterval(() => {
            setFocusTime((prevTime) => prevTime + 1);
          }, 1000);
        }
      } else {
        clearFocusInterval();
      }
    }

    checkAndStart();

    document.addEventListener('visibilitychange', checkAndStart);
    window.addEventListener('popstate', checkAndStart);

    return () => {
      document.removeEventListener('visibilitychange', checkAndStart);
      window.removeEventListener('popstate', checkAndStart);
      clearFocusInterval();
    };
  }, [state, running, window.location.pathname]);

  return focusTime;
};

export { useFocusTime };
