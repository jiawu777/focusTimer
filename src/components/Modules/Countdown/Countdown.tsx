import { useAtomValue, useAtom } from 'jotai';
import { openAtom, modalTypeAtom } from '@/store/modalAtoms';
import { currentTaskAtom, DEFAULT_TASK } from '@/store/taskAtoms';
import { isRunning } from '@/store/timerAtoms';
import { useTimer } from '@/hooks/useTimer';
import { usePageViewLog } from '@/components/Modules/Countdown/ProgressBarModal/usePageViewLog';
import Button, { ButtonVariant } from '@/components/common/Button/Button';
import Modal, { ModalVariant } from '@/components/common/Modal';
import Nodata from '@/components/common/NoData';
import ProgressBarModal from './ProgressBarModal';
import InputData from './InputData';
import TimerDisplay from './TimerDisplay/TimerDisplay';
import TaskDisplay from './TaskDisplay/TaskDisplay';
import './Countdown.scss';

const Countdown = () => {
  const { timer, running, toggleTimer } = useTimer();
  const { taskName } = useAtomValue(currentTaskAtom);
  const runningStatus = useAtomValue(isRunning);
  const [open, setOpen] = useAtom(openAtom);
  const [modalVariant, setModalVariant] = useAtom(modalTypeAtom);

  usePageViewLog(runningStatus);

  return (
    <>
      {open && (
        <Modal>
          {modalVariant === ModalVariant.NoData && <Nodata />}
          {modalVariant === ModalVariant.SetTask && <InputData />}
          {modalVariant === ModalVariant.ShowAnalytics && <ProgressBarModal />}
        </Modal>
      )}

      <div
        className={`countdown__wrapper${runningStatus ? ' countdown__wrapper--grow' : ''}${
          open ? ' countdown__wrapper--hide' : ''
        }`}
      >
        <TimerDisplay timer={timer} />
        <TaskDisplay
          taskName={taskName}
          defaultTask={DEFAULT_TASK}
        />
        <div className="countdown__buttonWrapper">
          <Button
            variant={ButtonVariant.ToggleTimer}
            className={running ? 'button__toggleTimer--on' : 'button__toggleTimer--off'}
            onClick={toggleTimer}
          >
            {running ? 'Pause' : 'Start'}
          </Button>
          <Button
            variant={ButtonVariant.ShowSetTaskModal}
            className={running ? 'button__showSetTaskModal--hide' : ''}
            onClick={() => {
              setModalVariant(ModalVariant.SetTask);
              setOpen(true);
            }}
          >
            Set Task
          </Button>
          <Button
            variant={ButtonVariant.ShowAnalyticsModal}
            className={running ? '' : ' button__showAnalyticsModal--hide'}
            onClick={() => {
              toggleTimer();
              setOpen(true);
              setModalVariant(ModalVariant.ShowAnalytics);
            }}
          >
            Analytics
          </Button>
        </div>
      </div>
    </>
  );
};

export default Countdown;
