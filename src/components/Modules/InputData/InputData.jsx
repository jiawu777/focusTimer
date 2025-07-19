import { useAtomValue, useAtom } from 'jotai';
import { isRunning } from '@/atoms/timerAtoms';
import { showSettingModalAtom } from '@/atoms/modalAtoms';
import { useInputData } from '@/hooks/useInputData';
import './InputData.scss';

const InputData = () => {
  const [show, setShow] = useAtom(showSettingModalAtom);

  const addTaskBtn = 'Set Task';
  const closeSettingBtn = 'Close';
  const settingTitle = 'Add Task';

  const { taskNameRef, workTimeRef, breakTimeRef, errors, handleSubmit } = useInputData();
  const runningStatus = useAtomValue(isRunning);
  if (!show) return null;
  return (
    <div className={`input__wrapper ${runningStatus ? 'input__wrapper--hide' : ''}`}>
      <h1 className="input__title">{settingTitle}</h1>
      <form
        className={`input__form `}
        onSubmit={handleSubmit}
      >
        <input
          required
          className="input__inputBox input__inputBox--task"
          type="text"
          ref={taskNameRef}
          placeholder="Enter Task"
        />
        {errors.task && <span className="err__taskError">{errors.task}</span>}
        <input
          required
          className="input__inputBox inputBox--workTime"
          type="number"
          ref={workTimeRef}
          placeholder="Enter WorkTime"
          min={1}
        />
        {errors.workTime && <span className="err__workTimeRef">{errors.workTime}</span>}
        <input
          required
          className="input__inputBox inputBox--breakTime"
          type="number"
          ref={breakTimeRef}
          placeholder="Enter BreakTime"
          min={1}
        />
        {errors.BreakTime && <span className="err__breakTimeRef">{errors.breakTime}</span>}
        <button
          type="submit"
          className="input__btn"
        >
          {addTaskBtn}
        </button>
      </form>
      <button
        className="btn btn__showSettingModal"
        onClick={() => setShow(false)}
      >
        {closeSettingBtn}
      </button>
    </div>
  );
};

export default InputData;
