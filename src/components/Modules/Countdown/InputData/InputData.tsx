import { useAtomValue, useAtom } from 'jotai';
import { isRunning } from '@/atoms/timerAtoms';
import { showSetTaskModalAtom } from '@/atoms/modalAtoms';
import { useInputData } from '@/hooks/useInputData';
import type { InputFieldProps } from '@/types/taskTypes';
import Button, { ButtonVariant } from '@/components/common/Button/Button';
import './InputData.scss';

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
  const [show, setShow] = useAtom(showSetTaskModalAtom);
  const runningStatus = useAtomValue(isRunning);
  const { taskNameRef, workTimeRef, breakTimeRef, errors, handleSubmit } = useInputData();

  if (!show) return null;

  return (
    <div className={`input__wrapper ${runningStatus ? 'input__wrapper--hide' : ''}`}>
      <h1 className="input__title">Add Task</h1>
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
          Set Task
        </Button>
        <Button
          variant={ButtonVariant.Close}
          onClick={() => setShow(false)}
        >
          Close
        </Button>
      </form>
    </div>
  );
};

export default InputData;
