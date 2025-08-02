import { useAtomValue, useSetAtom } from 'jotai';
import { z } from 'zod';
import { clearPageViewLogAtom } from '@/store/atoms/taskAtoms';
import { currentTaskAtom } from '@/store/atoms/userAtoms';
import { showAnalyticsModalAtom } from '@/store/atoms/modalAtoms';
import { useTimer } from '@/hooks/useTimer';
import { useSegmentProgressBar } from '@/hooks/useSegmentProgressBar';
import { useScheduledSegments } from '@/hooks/useScheduledSegment';
import { DEFAULT_WORKTIME, DEFAULT_BREAKTIME } from '@/constants/storage';
import Button, { ButtonVariant } from '@/components/common/Button/Button';
import ProgressBar from '@/components/common/ProgressBar/ProgressBar';
import TimeStamp from '@/components/common/TimeStamp/TimeStamp';
import './ProgressBarModal.scss';

const ProgressBarModal = () => {
  const { pageViewLog = [] } = useAtomValue(currentTaskAtom);
  const setShow = useSetAtom(showAnalyticsModalAtom);
  const workTime = useAtomValue(currentTaskAtom)?.workTimeRef || DEFAULT_WORKTIME;
  const breakTime = useAtomValue(currentTaskAtom)?.breakTimeRef || DEFAULT_BREAKTIME;
  const segments = useSegmentProgressBar(pageViewLog ?? []);
  const clearPageViewLog = useSetAtom(clearPageViewLogAtom);
  const { resetTimer } = useTimer();

  const start = segments.length ? segments[0].start : 0;
  const end = segments.length ? segments[segments.length - 1].end : 0;
  const scheduledSegments = useScheduledSegments(start, end, workTime, breakTime);

  if (!segments.length) return <div>沒有資料可顯示</div>;

  return (
    <div
      className="progress-bar__overlay"
      onClick={() => setShow(false)}
    >
      <div className="progress-bar__wrapper">
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
              clearPageViewLog();
              resetTimer();
            }}
          >
            Clear
          </Button>
          <Button
            variant={ButtonVariant.Close}
            onClick={() => setShow(false)}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarModal;
