import './TimeStamp.scss';

type TimeStampProp = {
  start: number;
  end: number;
  block: string;
};

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

export default TimeStamp;
