import { useAtomValue, useSetAtom } from 'jotai';
import { currentTaskAtom, showAnalyticsModalAtom, clearPageViewLogAtom } from '@/atoms/taskAtoms';
import { useSegmentProgressBar } from '@/hooks/useSegmentProgressBar';
import { useScheduledSegments } from '@/hooks/useScheduledSegment';
import './ProgressBarModal.scss';

const ProgressBarModal = () => {
  const { pageViewLog = [] } = useAtomValue(currentTaskAtom);
  const ProgressBarTitle = 'Your Focus Progress Bar Result';
  const scheduledProgressBarTitle = 'Your Scheduled Progress Bar Result';
  const closeAnalyticsBtn = 'Close';
  const clearAnalyticsBtn = 'Clear';
  const setShow = useSetAtom(showAnalyticsModalAtom);
  const workTime = useAtomValue(currentTaskAtom)?.workTimeRef || 25; // Default to 25 minutes if not set
  const breakTime = useAtomValue(currentTaskAtom)?.breakTimeRef || 5; //
  const segments = useSegmentProgressBar(pageViewLog);
  const clearPageViewLog = useSetAtom(clearPageViewLogAtom);
  const scheduledSegments = useScheduledSegments(
    segments[0].start,
    segments[segments.length - 1].end,
    workTime,
    breakTime
  );
  const lastSegmentIndex = segments.length - 1;
  if (!segments.length) return <div>沒有資料可顯示</div>;
  return (
    <div className="progressBar__overlay">
      <div className="progressBar__wrapper">
        <div className="progressBar__timeStamp">
          <div className="progressBar__timeStamp progressBar__timeStamp--start">
            {new Date(segments[0].start).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
          <div className="progressBar__timeStamp progressBar__timeStamp--end">
            {new Date(segments[lastSegmentIndex].end).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
        <div className="progressBar__title">{ProgressBarTitle}</div>

        <div className="progressBar__bar">
          {segments.map((seg, index) => (
            <div
              key={index}
              style={{ width: `${seg.percent}%` }}
              className={`progressBar__segment ${
                seg.state === 'focus'
                  ? 'progressBar__segment--focus'
                  : 'progressBar__segment--distract'
              }`}
            >
              {seg.state}
            </div>
          ))}
        </div>
        <div className="scheduledProgressBar__title">{scheduledProgressBarTitle}</div>
        <div className="scheduledProgressBar__bar">
          {scheduledSegments.map((seg, index) => (
            <div
              key={index}
              style={{ width: `${seg.percent}%` }}
              className={`scheduledProgressBar__segment ${
                seg.state === 'work'
                  ? 'scheduledProgressBar__segment--focus'
                  : 'scheduledProgressBar__segment--distract'
              }`}
            >
              {seg.state}
            </div>
          ))}
        </div>
        <div className="progressBar__btn">
          <button
            className="progressBar__btn progressBar__btn--clearAnalyticsData"
            onClick={() => clearPageViewLog()}
          >
            {clearAnalyticsBtn}
          </button>
          <button
            className="progressBar__btn progressBar__btn--showAnalyticsModal"
            onClick={() => setShow(false)}
          >
            {closeAnalyticsBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressBarModal;
