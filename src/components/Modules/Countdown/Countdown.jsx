import { useAtomValue } from 'jotai';
import { currentTaskAtom, DEFAULT_BREAKTEXT, timerStateAtom, isRunning } from '@/atoms/taskAtoms';
import { useTimer } from '@/hooks/useTimer';
import { useSecTrans } from '@/hooks/useSecTrans';
import './Countdown.scss';

const Countdown = () => {
  const { timer, running, toggleTimer, resetTimer, skipTimer } = useTimer();
  const TimerSwitch = {
    on: 'Start',
    off: 'Pause',
    reset: 'Reset',
    skip: 'Skip',
  };
  const { minutes, seconds } = useSecTrans(timer);
  const { taskName, estimateCycle, usedCycle } = useAtomValue(currentTaskAtom);
  const state = useAtomValue(timerStateAtom);
  const displayText = state === 'work' ? taskName : DEFAULT_BREAKTEXT;
  const runningStatus = useAtomValue(isRunning);

  return (
    <div className={`display__wrapper ${runningStatus ? 'display__wrapper--grow' : ''}`}>
      <div className="countdown__wrapper">
        <h1 className="countdown__timer">
          {minutes}:{seconds}
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
          }`}
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
    </div>
  );
};

export default Countdown;
