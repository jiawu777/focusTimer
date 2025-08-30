import { FC } from 'react';
import { useAtom } from 'jotai';
import { openAtom } from '@/store/modalAtoms';
import Button, { ButtonVariant } from '../Button/Button';
import './Modal.scss';

enum ModalVariant {
  SetTask,
  ShowAnalytics,
  NoData,
}

type ModalType = { variant?: ModalVariant; children?: React.ReactNode };

const Modal: FC<ModalType> = ({ children }) => {
  const [, setOpen] = useAtom(openAtom);

  return (
    <div className="modal__overlay">
      <div
        className="modal__wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <Button
          variant={ButtonVariant.Close}
          onClick={() => {
            setOpen(false);
          }}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default Modal;
export { ModalVariant };
