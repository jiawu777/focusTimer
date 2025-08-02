import { ReactNode, FC } from 'react';
import './Modal.scss';

interface ModalProps {
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ children }) => (
  <div className="modal__overlay">
    <div
      className="modal__wrapper"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);

export default Modal;
