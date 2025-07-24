import { useAtomValue, useAtom } from 'jotai';
import { currentTaskAtom } from '@/atoms/userAtoms';
import { isRunning } from '@/atoms/timerAtoms';
import { showSetTaskModalAtom } from '@/atoms/modalAtoms';
import { useTimer } from '@/hooks/useTimer';
import { usePageViewLog } from '@/hooks/usePageViewLog';
import { useToggleModal } from '@/hooks/useToggleModal';
import { DEFAULT_TASK } from '@/constants/storage';
import type { TimerDisplay, TaskDisplay } from '@/types/taskTypes';
import './Countdown.scss';

const TimerDisplay = ({ timer }: TimerDisplay) => {
  const min = String(Math.floor(timer / 60)).padStart(2, '0');
  const sec = String(Math.floor(timer % 60)).padStart(2, '0');
  return (
    <div className="countdown__wrapper">
      <h1 className="countdown__timer">
        {min}:{sec}
      </h1>
    </div>
  );
};

const TaskDisplay = ({ taskName, defaultTask }: TaskDisplay) => (
  <div className="task__wrapper">
    <h1 className="task__currentTask">{taskName || defaultTask}</h1>
  </div>
);

const Countdown = () => {
  const { timer, running, toggleTimer } = useTimer();
  const [showSetTaskModal, setShowSetTaskModal] = useAtom(showSetTaskModalAtom);
  const { taskName } = useAtomValue(currentTaskAtom);
  const runningStatus = useAtomValue(isRunning);
  const { handleShowAnalytics } = useToggleModal();

  usePageViewLog(runningStatus);

  return (
    <div
      className={`display__wrapper${runningStatus ? ' display__wrapper--grow' : ''}${
        showSetTaskModal ? ' display__wrapper--hide' : ''
      }`}
    >
      <TimerDisplay timer={timer} />
      <TaskDisplay
        taskName={taskName}
        defaultTask={DEFAULT_TASK}
      />
      <div className="btn__wrapper">
        <button
          className={`btn btn__toggleTimer btn__toggleTimer--${running ? 'off' : 'on'}`}
          onClick={toggleTimer}
        >
          {running ? 'Pause' : 'Start'}
        </button>
      </div>
      <button
        className={`btn btn__showSetTaskModal${running ? ' btn__showSetTaskModal--hide' : ''}`}
        onClick={() => setShowSetTaskModal(true)}
      >
        Set Task
      </button>
      <button
        className={`btn btn__showAnalyticsModal${running ? '' : ' btn__showAnalyticsModal--hide'}`}
        onClick={handleShowAnalytics}
      >
        Analytics
      </button>
    </div>
  );
};

export default Countdown;
