import './ProgressBar.scss';

const ProgressBar = ({
  segments,
  stateMap,
}: {
  segments: any[];
  stateMap: Record<string, string>;
}) => (
  <>
    <div className={`progressBar__bar`}>
      {segments.map((seg, index) => (
        <div
          key={index}
          style={{ width: `${seg.percent}%` }}
          className={`progressBar__segment progressBar__segment--${
            stateMap[seg.state] || seg.state
          }`}
        />
      ))}
    </div>
  </>
);

export default ProgressBar;
