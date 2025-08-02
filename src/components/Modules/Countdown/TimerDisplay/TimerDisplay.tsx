import { z } from 'zod';
import './TimerDisplay.scss';

const TimerDisplaySchema = z.object({
  timer: z.number(),
});
type TimerDisplayProp = z.infer<typeof TimerDisplaySchema>;

const TimerDisplay = ({ timer }: TimerDisplayProp) => {
  const min = String(Math.floor(timer / 60)).padStart(2, '0');
  const sec = String(Math.floor(timer % 60)).padStart(2, '0');
  return (
    <div className="timer-display__wrapper">
      <h1 className="timer-display__timer">
        {min}:{sec}
      </h1>
    </div>
  );
};

export default TimerDisplay;
