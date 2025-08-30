import { useAtomValue, useAtom, useSetAtom } from 'jotai';
import { isRunning } from '@/store/timerAtoms';
import { openAtom, modalTypeAtom } from '@/store/modalAtoms';
import { ModalVariant } from '@/components/common/Modal';
import Button, { ButtonVariant } from '@/components/common/Button/Button';
import { useInputData } from './useInputData';
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
  const [open, setOpen] = useAtom(openAtom);
  const [modalType, setModalType] = useAtom(modalTypeAtom);
  const runningStatus = useAtomValue(isRunning);
  const { taskNameRef, workTimeRef, breakTimeRef, errors, handleSubmit } = useInputData();

  if (!open || modalType !== ModalVariant.SetTask) return null;

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
          placeholder="Enter WorkTime (min)"
          className={'input__inputBox input__inputBox--workTime'}
          error={errors.workTime}
        />
        <InputField
          type="text"
          refProp={breakTimeRef}
          placeholder="Enter BreakTime (min)"
          className={'input__inputBox input__inputBox--breakTime'}
          error={errors.breakTime}
        />
        <Button
          variant={ButtonVariant.Submit}
          type="submit"
        >
          Set
        </Button>
      </form>
    </div>
  );
};

export default InputData;
