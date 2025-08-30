import { localeTime } from '@/utils/getLocaleTimeString';
import './TimeStamp.scss';

type TimeStampProp = {
  start: number;
  end: number;
};

const TimeStamp = ({ start, end }: TimeStampProp) => {
  return (
    <div className="timeStamp">
      <div className="timeStamp__start">{localeTime(start)}</div>
      <div className="timeStamp__end">{localeTime(end)}</div>
    </div>
  );
};

export default TimeStamp;
