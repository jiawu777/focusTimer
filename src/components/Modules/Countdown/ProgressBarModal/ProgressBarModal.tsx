import { useAtomValue, useSetAtom } from 'jotai';
import { clearPageViewLogAtom } from '@/atoms/taskAtoms';
import { currentTaskAtom } from '@/atoms/userAtoms';
import { showAnalyticsModalAtom } from '@/atoms/modalAtoms';
import { useTimer } from '@/hooks/useTimer';
import { useSegmentProgressBar } from '@/hooks/useSegmentProgressBar';
import { useScheduledSegments } from '@/hooks/useScheduledSegment';
import { DEFAULT_WORKTIME, DEFAULT_BREAKTIME } from '@/constants/storage';
import Button, { ButtonVariant } from '@/components/common/Button/Button';
import type { TimeStampProp } from '@/types/taskTypes';
import './ProgressBarModal.scss';

const TimeStamp = ({ start, end, block }: TimeStampProp) => {
  return (
    <div className="timeStamp">
      <div className="timeStamp__start">
        {new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="timeStamp__end">
        {new Date(end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
      <div className="timeStamp__block">{block}</div>
    </div>
  );
};
const ProgressBar = ({
  segments,
  block,
  stateMap,
}: {
  segments: any[];
  block: string;
  stateMap: Record<string, string>;
}) => (
  <div className={`${block}__bar`}>
    {segments.map((seg, index) => (
      <div
        key={index}
        style={{ width: `${seg.percent}%` }}
        className={`${block}__segment ${block}__segment--${stateMap[seg.state] || seg.state}`}
      />
    ))}
  </div>
);

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
    <div className="progressBar__overlay">
      <div className="progressBar__wrapper">
        <TimeStamp
          start={start}
          end={end}
          block="progressBar"
        />

        <div className="progressBar__title">Result Progress Bar</div>
        <ProgressBar
          segments={segments}
          block="progressBar"
          stateMap={{ focus: 'focus', distract: 'distract', unknown: 'unknown' }}
        />

        <div className="scheduledProgressBar__title">Planned Progress Bar</div>
        <ProgressBar
          segments={scheduledSegments}
          block="scheduledProgressBar"
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
