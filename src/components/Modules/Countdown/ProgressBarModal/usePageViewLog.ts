import { useEffect, useRef } from 'react';
import { useTask } from '@/hooks/useTask';
import pathname from '@/router/Router';

const usePageViewLog = (runningStatus: boolean) => {
  const { updatePageViewLog, resetPageViewLog } = useTask();
  const prevState = useRef<boolean | null>(null);
  const checkIsOnPage = () => {
    return (
      document.visibilityState === 'visible' &&
      pathname.some((route) => window.location.pathname === route.path)
    );
  };

  // 初始化頁面載入時記錄
  useEffect(() => {
    resetPageViewLog();
  }, []);

  useEffect(() => {
    const handleChange = () => {
      const now = Date.now();
      const current = checkIsOnPage();
      // 初次或切換才記錄
      if (prevState.current === current && runningStatus === true) return;
      else {
        updatePageViewLog({ visible: current, timestamp: now });
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
  }, [runningStatus]);

  const clearPageViewLog = () => {
    resetPageViewLog();
    updatePageViewLog({ visible: true, timestamp: Date.now() });
    prevState.current = true;
  };

  return { clearPageViewLog };
};

export { usePageViewLog };
