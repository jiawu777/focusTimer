import { useAtomValue, useAtom } from 'jotai';
import { currentTaskAtom } from '@/atoms/userAtoms';
import { isRunning } from '@/atoms/timerAtoms';
import { showSetTaskModalAtom } from '@/atoms/modalAtoms';
import { useTimer } from '@/hooks/useTimer';
import { usePageViewLog } from '@/hooks/usePageViewLog';
import { useToggleModal } from '@/hooks/useToggleModal';
import { DEFAULT_TASK } from '@/constants/storage';
import Button, { ButtonVariant } from '@/components/common/Button/Button';
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
      <div className="btn btn__wrapper">
        <Button
          variant={ButtonVariant.ToggleTimer}
          className={running ? 'btn__toggleTimer--on' : 'btn__toggleTimer--off'}
          onClick={toggleTimer}
        >
          {running ? 'Pause' : 'Start'}
        </Button>
        <Button
          variant={ButtonVariant.ShowSetTaskModal}
          className={running ? 'btn__showSetTaskModal--hide' : ''}
          onClick={() => setShowSetTaskModal(true)}
        >
          Set Task
        </Button>
        <Button
          variant={ButtonVariant.ShowAnalyticsModal}
          className={running ? '' : ' btn__showAnalyticsModal--hide'}
          onClick={handleShowAnalytics}
        >
          Analytics
        </Button>
      </div>
    </div>
  );
};

export default Countdown;
