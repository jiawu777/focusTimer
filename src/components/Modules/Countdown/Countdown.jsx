import { useEffect } from 'react';
import { useAtomValue, useAtom } from 'jotai';
import { currentTaskAtom, isRunning, showSettingModalAtom } from '@/atoms/taskAtoms';
import { useTimer } from '@/hooks/useTimer';
import usePageViewLog from '@/hooks/usePageViewLog';
import './Countdown.scss';

const Countdown = () => {
  const { timer, running, toggleTimer } = useTimer();
  const TimerSwitch = {
    on: 'Start',
    off: 'Pause',
  };
  const openSettingBtn = 'Setting';
  const minDisplay = String(Math.floor(timer / 60)).padStart(2, '0');
  const secDisplay = String(Math.floor(timer % 60)).padStart(2, '0');
  const { taskName, DEFAULT_TASK } = useAtomValue(currentTaskAtom);
  const displayText = taskName || DEFAULT_TASK;
  const runningStatus = useAtomValue(isRunning);
  const [ShowSettingModal, setShowSettingModal] = useAtom(showSettingModalAtom);

  usePageViewLog(runningStatus);

  return (
    <div
      className={`display__wrapper ${runningStatus ? 'display__wrapper--grow' : ''} ${
        ShowSettingModal ? 'display__wrapper--hide' : ''
      }`}
    >
      <div className="countdown__wrapper">
        <h1 className="countdown__timer">
          {minDisplay}:{secDisplay}
        </h1>
      </div>
      <div className="task__wrapper">
        <h1 className="task__currentTask">{displayText}</h1>
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
      </div>
      <button
        className={`btn btn__showSettingModal ${running ? 'btn__showSettingModal--hide' : ''}`}
        onClick={() => setShowSettingModal(true)}
      >
        {openSettingBtn}
      </button>
    </div>
  );
};

export default Countdown;
