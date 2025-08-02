import { useAtomValue, useAtom } from 'jotai';
import { isRunning } from '@/store/atoms/timerAtoms';
import { ModalType, showModalAtom, modalTypeAtom } from '@/store/atoms/modalAtoms';
import { useInputData } from '@/hooks/useInputData';
import Button, { ButtonVariant } from '@/components/common/Button/Button';
import './InputData.scss';

type InputFieldProps = {
  type: string;
  refProp: React.RefObject<HTMLInputElement>;
  placeholder: string;
  className: string;
  error?: string;
};

const InputField = ({ type, refProp, placeholder, className, error }: InputFieldProps) => {
  //1140721改成tsx
  return (
    <>
      <input
        required
        className={className}
        type={type}
        ref={refProp}
        placeholder={placeholder}
        min={type === 'number' ? 1 : undefined}
      />
      {error && <span className={`err__${className.split('--')[1]}Error`}>{error}</span>}
    </>
  );
};
const InputData = () => {
  const [showModal, setShowModal] = useAtom(showModalAtom);
  const [modalType, setModalType] = useAtom(modalTypeAtom);
  const runningStatus = useAtomValue(isRunning);
  const { taskNameRef, workTimeRef, breakTimeRef, errors, handleSubmit } = useInputData();

  if (!showModal || modalType !== ModalType.SetTask) return null;

  return (
    <div className={`input__wrapper ${runningStatus ? 'input__wrapper--hide' : ''}`}>
      <h1 className="input__title">Set Task</h1>
      <form
        className="input__form"
        onSubmit={handleSubmit}
      >
        <InputField
          type="text"
          refProp={taskNameRef}
          placeholder="Enter Task"
          className={'input__inputBox input__inputBox--task'}
          error={errors.task}
        />
        <InputField
          type="number"
          refProp={workTimeRef}
          placeholder="Enter WorkTime (minutes)"
          className={'input__inputBox input__inputBox--workTime'}
          error={errors.workTime}
        />
        <InputField
          type="text"
          refProp={breakTimeRef}
          placeholder="Enter BreakTime (minutes)"
          className={'input__inputBox input__inputBox--breakTime'}
          error={errors.breakTime}
        />
        <Button
          variant={ButtonVariant.Submit}
          type="submit"
        >
          Set
        </Button>
        <Button
          variant={ButtonVariant.Close}
          onClick={() => {
            if (showModal && modalType === ModalType.SetTask) {
              setShowModal(false);
              setModalType(null);
            }
          }}
        >
          Close
        </Button>
      </form>
    </div>
  );
};

export default InputData;
