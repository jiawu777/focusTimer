import { useAtom } from 'jotai';
import { isRunning } from '@/store/atoms/timerAtoms';
import { showAnalyticsModalAtom } from '@/store/atoms/modalAtoms';

const useToggleModal = () => {
  const [, setShowAnalyticsModal] = useAtom(showAnalyticsModalAtom);
  const [, setRunning] = useAtom(isRunning);

  // 開啟 Analytics Modal 並暫停計時器
  const handleShowAnalytics = () => {
    setShowAnalyticsModal(true);
    setRunning(false);
  };
  return {
    handleShowAnalytics,
  };
};

export { useToggleModal };
