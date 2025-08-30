import { useAtomValue, useAtom } from 'jotai';
import { useEffect } from 'react';
import { useTask } from '@/hooks/useTask';
import { currentTaskAtom, DEFAULT_WORKTIME, DEFAULT_BREAKTIME } from '@/store/taskAtoms';
import { openAtom, modalTypeAtom } from '@/store/modalAtoms';
import { useTimer } from '@/hooks/useTimer';
import Button, { ButtonVariant } from '@/components/common/Button/Button';
import ProgressBar from '@/components/common/ProgressBar/ProgressBar';
import TimeStamp from '@/components/common/TimeStamp/TimeStamp';
import { ModalVariant } from '@/components/common/Modal/Modal';
import { useSegmentProgressBar } from './useSegmentProgressBar';
import { useScheduledSegments } from './useScheduledSegment';
import './ProgressBarModal.scss';

const ProgressBarModal = () => {
  const { pageViewLog = [] } = useAtomValue(currentTaskAtom);
  const [open, setOpen] = useAtom(openAtom);
  const [modalVariant, setModalVariant] = useAtom(modalTypeAtom);
  const workTime = useAtomValue(currentTaskAtom)?.workTimeRef || DEFAULT_WORKTIME;
  const breakTime = useAtomValue(currentTaskAtom)?.breakTimeRef || DEFAULT_BREAKTIME;
  const segments = useSegmentProgressBar(pageViewLog ?? []);
  const { resetTimer } = useTimer();
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
      setModalVariant(ModalVariant.NoData);
      setOpen(true);
    }
  }, [segments]);

  return (
    <>
      <TimeStamp
        start={start}
        end={end}
      />
      <div className="progressBar__title">Result Progress Bar</div>
      <ProgressBar
        segments={segments}
        stateMap={{ focus: 'focus', distract: 'distract', unknown: 'unknown' }}
      />
      <div className="progressBar__title">Planned Progress Bar</div>
      <ProgressBar
        segments={scheduledSegments}
        stateMap={{ work: 'focus', break: 'distract' }} //work跟break的狀態映射
      />
      <div className="button button__wrapper">
        <Button
          variant={ButtonVariant.Clear}
          onClick={() => {
            resetPageViewLog();
            resetTimer();
          }}
        >
          Clear
        </Button>
      </div>
    </>
  );
};

export default ProgressBarModal;
