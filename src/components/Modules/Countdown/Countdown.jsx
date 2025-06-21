import { useAtomValue, useAtom } from 'jotai';
import {
  currentTaskAtom,
  DEFAULT_BREAKTEXT,
  timerStateAtom,
  isRunning,
  showSettingModalAtom,
} from '@/atoms/taskAtoms';
import { useTimer } from '@/hooks/useTimer';
import InputData from '../InputData';
import './Countdown.scss';

const Countdown = () => {
  const { timer, running, toggleTimer, resetTimer, skipTimer } = useTimer();
  const TimerSwitch = {
    on: 'Start',
    off: 'Pause',
    reset: 'Reset',
    skip: 'Skip',
  };
  const minDisplay = String(Math.floor(timer / 60)).padStart(2, '0');
  const secDisplay = String(Math.floor(timer % 60)).padStart(2, '0');
  const { taskName, estimateCycle, usedCycle } = useAtomValue(currentTaskAtom);
  const state = useAtomValue(timerStateAtom);
  const displayText = state === 'work' ? taskName : DEFAULT_BREAKTEXT;
  const runningStatus = useAtomValue(isRunning);
  const [ShowSettingModal, setShowSettingModal] = useAtom(showSettingModalAtom);

  return (
    <div className={`display__wrapper ${runningStatus ? 'display__wrapper--grow' : ''}`}>
      <div className="countdown__wrapper">
        <h1 className="countdown__timer">
          {minDisplay}:{secDisplay}
        </h1>
      </div>
      <div className="task__wrapper">
        <h1 className="task__currentTask">{displayText}</h1>
        <h1 className={`task__currentCycle ${state === 'work' ? '' : 'task__currentCycle--hide'}`}>
          {usedCycle}/{estimateCycle}
        </h1>
      </div>
      <div className="btn__wrapper">
        <button
          className={`btn btn__toggleTimer ${
            running ? 'btn__toggleTimer--off' : 'btn__toggleTimer--on'
          }
          ${ShowSettingModal ? 'Close' : 'Setting'}`}
          onClick={toggleTimer}
        >
          {running ? TimerSwitch.off : TimerSwitch.on}
        </button>
        <button
          className={`btn btn__reset ${running ? '' : 'btn__reset--hide'}`}
          onClick={resetTimer}
        >
          {TimerSwitch.reset}
        </button>
        <button
          className={`btn btn__skip ${running ? '' : 'btn__skip--hide'}`}
          onClick={skipTimer}
        >
          {TimerSwitch.skip}
        </button>
      </div>
      <button
        className={`btn btn__showSettingModal ${running ? 'btn__showSettingModal--hide' : ''}`}
        onClick={() => setShowSettingModal((prev) => !prev)}
      >
        {ShowSettingModal ? 'Close' : 'Setting'}
      </button>
    </div>
  );
};

export default Countdown;
