import { useSetAtom } from 'jotai';
import Button, { ButtonVariant } from '@/components/common/Button/Button';
import { showModalAtom, modalTypeAtom } from '@/store/atoms/modalAtoms';
import Modal from '../Modal/Modal';
import './NoData.scss';

type NodataProps = {
  message?: string;
};

const Nodata = ({ message = '沒有資料可顯示' }: NodataProps) => {
  const setShow = useSetAtom(showModalAtom);
  const setModalType = useSetAtom(modalTypeAtom);

  return (
    <Modal>
      <h1 className="no-data__message">{message}</h1>
      <div className="btn btn__wrapper">
        <Button
          variant={ButtonVariant.Close}
          onClick={() => {
            setShow(false);
            setModalType(null);
          }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default Nodata;
