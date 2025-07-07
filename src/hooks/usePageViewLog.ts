import { useEffect, useRef } from 'react';
import { useSetAtom } from 'jotai';
import { updatePageViewAtom } from '@/atoms/taskAtoms';
import pathname from '@/router/Router';

const usePageViewLog = (runningStatus: boolean) => {
  const setPageViewLog = useSetAtom(updatePageViewAtom);
  const prevState = useRef<boolean | null>(null);

  const checkIsOnPage = () => {
    return (
      document.visibilityState === 'visible' &&
      pathname.some((route) => window.location.pathname === route.path)
    );
  };

  useEffect(() => {
    const handleChange = () => {
      const now = Date.now();
      const current = checkIsOnPage();
      // 初次或切換才記錄
      if (prevState.current === current) return;
      else {
        setPageViewLog({ visible: current, timestamp: now });
        prevState.current = current;
      }
    };

    handleChange();

    document.addEventListener('visibilitychange', handleChange);
    window.addEventListener('popstate', handleChange);

    return () => {
      document.removeEventListener('visibilitychange', handleChange);
      window.removeEventListener('popstate', handleChange);
    };
  }, [setPageViewLog, runningStatus]);
};

export { usePageViewLog };
