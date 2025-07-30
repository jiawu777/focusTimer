import './ProgressBar.scss';

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

export default ProgressBar;
