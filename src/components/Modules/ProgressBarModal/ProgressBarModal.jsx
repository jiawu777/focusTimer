import { useAtomValue, useSetAtom } from 'jotai';
import { currentTaskAtom, showAnalyticsModalAtom } from '@/atoms/taskAtoms';
import { useSegmentProgressBar } from '@/hooks/useSegmentProgressBar';
import './ProgressBarModal.scss';

const ProgressBarModal = () => {
  const { pageViewLog = [] } = useAtomValue(currentTaskAtom);
  const segments = useSegmentProgressBar(pageViewLog);
  const ProgressBarTitle = 'You Focus Progress Bar Result:';
  const closeAnalyticsBtn = 'Close';
  const setShow = useSetAtom(showAnalyticsModalAtom);

  if (!segments.length) return <div>沒有資料可顯示</div>;
  return (
    <div className="progressBar__overlay">
      <div className="progressBar__wrapper">
        <div className="progressBar__title">{ProgressBarTitle}</div>
        <div className="progressBar__timeStamp">
          <div className="progressBar__timeStamp progressBar__timeStamp--start">
            {new Date(segments[0].start).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
          <div className="progressBar__timeStamp progressBar__timeStamp--end">
            {new Date(segments[0].end).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
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

        <button
          className="progressBar__btn progressBar__btn--showAnalyticsModal"
          onClick={() => setShow(false)}
        >
          {closeAnalyticsBtn}
        </button>
      </div>
    </div>
  );
};

export default ProgressBarModal;
