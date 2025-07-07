import { useAtom } from 'jotai';
import { isRunning, showSettingModalAtom, showAnalyticsModalAtom } from '@/atoms/taskAtoms';

const useToggleModal = () => {
  const [showAnalyticsModal, setShowAnalyticsModal] = useAtom(showAnalyticsModalAtom);
  const [running, setRunning] = useAtom(isRunning);

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
