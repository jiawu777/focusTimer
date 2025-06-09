import { useAtom } from 'jotai';
import { showModalAtom } from '@/atoms/taskAtoms';
import { useFocusTime } from '@/hooks/useFocusTime';
import { useSecTrans } from '@/hooks/useSecTrans';
import './FocusModal.scss';

const FocusModal = () => {
  const [showModal, setShowModal] = useAtom(showModalAtom);
  const focusTime = useFocusTime();
  const { minutes, seconds } = useSecTrans(focusTime);
  if (!showModal) return null;
  return (
    <div className="modal__wrapper">
      <div className="modal__content">
        <h2 className="modal__h2">Focused Time</h2>
        <h2>
          {minutes}:{seconds}
        </h2>
        <button
          className="modal__button"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FocusModal;
