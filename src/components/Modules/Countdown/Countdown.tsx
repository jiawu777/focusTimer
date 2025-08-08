import { useAtomValue, useAtom } from 'jotai';
import { currentTaskAtom } from '@/store/atoms/taskAtoms';
import { isRunning } from '@/store/atoms/timerAtoms';
import { showModalAtom, modalTypeAtom, ModalType } from '@/store/atoms/modalAtoms';
import { DEFAULT_TASK } from '@/constants/storage';
import Button, { ButtonVariant } from '@/components/common/Button/Button';
import NoData from '@/components/common/NoData';
import { useTimer } from '@/hooks/useTimer';
import { usePageViewLog } from '@/hooks/usePageViewLog';
import { useToggleModal } from '@/hooks/useToggleModal';
import ProgressBarModal from './ProgressBarModal';
import InputData from './InputData';
import TimerDisplay from './TimerDisplay/TimerDisplay';
import TaskDisplay from './TaskDisplay/TaskDisplay';
import './Countdown.scss';

const Countdown = () => {
  const { timer, running, toggleTimer } = useTimer();
  const [showModal, setShowModal] = useAtom(showModalAtom);
  const [modalType, setModalType] = useAtom(modalTypeAtom);
  const { taskName } = useAtomValue(currentTaskAtom);
  const runningStatus = useAtomValue(isRunning);
  const { handleShowAnalytics } = useToggleModal();

  usePageViewLog(runningStatus);

  return (
    <>
      {showModal && modalType === ModalType.Analytics && <ProgressBarModal />}
      {showModal && modalType === ModalType.SetTask && <InputData />}
      {showModal && modalType === ModalType.NoData && <NoData />}
      <div
        className={`countdown__wrapper${runningStatus ? ' countdown__wrapper--grow' : ''}${
          showModal ? ' countdown__wrapper--hide' : ''
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
            onClick={() => {
              setModalType(ModalType.SetTask);
              setShowModal(true);
            }}
          >
            Set Task
          </Button>
          <Button
            variant={ButtonVariant.ShowAnalyticsModal}
            className={running ? '' : ' btn__showAnalyticsModal--hide'}
            onClick={() => {
              handleShowAnalytics();
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
