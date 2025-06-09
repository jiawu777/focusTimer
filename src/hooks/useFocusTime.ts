import { useEffect, useRef, useState } from 'react';
import { useAtomValue } from 'jotai';
import { timerStateAtom, isRunning } from '@/atoms/taskAtoms';
import pathname from '@/router/Router';

const useFocusTime = () => {
  const [focusTime, setFocusTime] = useState<number>(0); //
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
    clearInterval(focusRef.current!);
    function checkAndStart() {
      if (state === 'work' && running) {
        if (document.visibilityState === 'visible' && isOnFocusPage()) {
          setFocusTime((prev) => prev - 1); // 修正countdownTimer 0之後還會跑一秒確認狀態<=0，問老師是否可以這樣直接暴力解？
          focusRef.current = setInterval(() => {
            setFocusTime((prev: number) => prev + 1);
          }, 1000);
        } else {
          clearFocusInterval();
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
  }, [state, running]);

  return focusTime;
};

export { useFocusTime };
