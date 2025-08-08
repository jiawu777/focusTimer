import { useAtomValue, useAtom } from 'jotai';
import { useEffect } from 'react';
import { useTask } from '@/hooks/useTask';
import { currentTaskAtom } from '@/store/atoms/taskAtoms';
import { ModalType, showModalAtom, modalTypeAtom } from '@/store/atoms/modalAtoms';
import { useTimer } from '@/hooks/useTimer';
import { useSegmentProgressBar } from '@/hooks/useSegmentProgressBar';
import { useScheduledSegments } from '@/hooks/useScheduledSegment';
import { useToggleModal } from '@/hooks/useToggleModal';
import { DEFAULT_WORKTIME, DEFAULT_BREAKTIME } from '@/constants/storage';
import Button, { ButtonVariant } from '@/components/common/Button/Button';
import ProgressBar from '@/components/common/ProgressBar/ProgressBar';
import TimeStamp from '@/components/common/TimeStamp/TimeStamp';
import Modal from '@/components/common/Modal/Modal';
import Nodata from '@/components/common/NoData';
import './ProgressBarModal.scss';

const ProgressBarModal = () => {
  const { pageViewLog = [] } = useAtomValue(currentTaskAtom);
  const [showModal, setShowModal] = useAtom(showModalAtom);
  const [modalType, setModalType] = useAtom(modalTypeAtom);
  const workTime = useAtomValue(currentTaskAtom)?.workTimeRef || DEFAULT_WORKTIME;
  const breakTime = useAtomValue(currentTaskAtom)?.breakTimeRef || DEFAULT_BREAKTIME;
  const segments = useSegmentProgressBar(pageViewLog ?? []);
  const { resetTimer } = useTimer();
  const { resetModal } = useToggleModal();
  const { resetPageViewLog } = useTask();

  const start = segments.length ? segments[0].start : 0;
  const end = segments.length ? segments[segments.length - 1].end : 0;
  const scheduledSegments = useScheduledSegments(start, end, workTime, breakTime);

  useEffect(() => {
    const diffHours = Math.floor((end - start) / 1000 / 60 / 60);
    if (diffHours > 1) {
      resetPageViewLog();
      resetTimer();
    }
  }, [end]);

  useEffect(() => {
    if (!segments.length) {
      setModalType(ModalType.NoData);
      setShowModal(true);
    }
  }, [segments]);

  if (modalType === ModalType.NoData && showModal) {
    return <Nodata />;
  }

  return (
    <Modal>
      <TimeStamp
        start={start}
        end={end}
        block="progress-bar"
      />

      <div className="progress-bar__title">Result Progress Bar</div>
      <ProgressBar
        segments={segments}
        block="progress-bar"
        stateMap={{ focus: 'focus', distract: 'distract', unknown: 'unknown' }}
      />

      <div className="progress-bar__title">Planned Progress Bar</div>
      <ProgressBar
        segments={scheduledSegments}
        block="progress-bar"
        stateMap={{ work: 'focus', break: 'distract' }} //work跟break的狀態映射
      />
      <div className="btn btn__wrapper">
        <Button
          variant={ButtonVariant.Clear}
          onClick={() => {
            resetPageViewLog();
            resetTimer();
          }}
        >
          Clear
        </Button>
        <Button
          variant={ButtonVariant.Close}
          onClick={() => {
            resetModal();
          }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default ProgressBarModal;
