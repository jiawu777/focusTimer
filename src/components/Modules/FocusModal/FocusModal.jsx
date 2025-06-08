import { useAtom } from 'jotai';
import { showModalAtom } from '@/atoms/taskAtoms';
import { useFocusTime } from '@/hooks/useFocusTime';
import './FocusModal.scss';

const FocusModal = () => {
  const [showModal, setShowModal] = useAtom(showModalAtom);
  const focusTime = useFocusTime();

  if (!showModal) return null;
  return (
    <div className="modal__wrapper">
      <div className="modal__content">
        <h2 className="modal__h2">Focused Time</h2>
        {focusTime}
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
