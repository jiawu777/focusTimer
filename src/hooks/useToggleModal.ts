import { useAtom } from 'jotai';
import { isRunning } from '@/store/atoms/timerAtoms';
import { showModalAtom, modalTypeAtom, ModalType } from '@/store/atoms/modalAtoms';

const useToggleModal = () => {
  const [, setShowModal] = useAtom(showModalAtom);
  const [, setRunning] = useAtom(isRunning);
  const [, setModalType] = useAtom(modalTypeAtom);

  // 開啟 Analytics Modal 並暫停計時器
  const handleShowAnalytics = () => {
    setModalType(ModalType.Analytics);
    setShowModal(true);
    setRunning(false);
  };
  const resetModal = () => {
    setShowModal(false);
    setModalType(null);
  };
  return {
    handleShowAnalytics,
    resetModal,
  };
};

export { useToggleModal };
