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
      console.log(`${current} before if`);
      // 初次或切換才記錄
      if (prevState.current === null || prevState.current !== current) {
        console.log(`${current} prevState.current === null || prevState.current !== current`);
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

export default usePageViewLog;
