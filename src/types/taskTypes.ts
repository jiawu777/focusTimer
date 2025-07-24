import { z } from 'zod';
import {
  UserInfoSchema,
  TaskSchema,
  PageViewLogSchema,
  ScheduledSegmentSchema,
  TimerDisplaySchema,
  TaskDisplaySchema,
} from '../schema/schema';

type UserInfo = z.infer<typeof UserInfoSchema>;
type Task = z.infer<typeof TaskSchema>;
type PageViewLog = z.infer<typeof PageViewLogSchema>;
type ScheduledSegment = z.infer<typeof ScheduledSegmentSchema>;
type TimerDisplay = z.infer<typeof TimerDisplaySchema>;
type TaskDisplay = z.infer<typeof TaskDisplaySchema>;
type InputFieldProps = {
  type: string;
  refProp: React.RefObject<HTMLInputElement>;
  placeholder: string;
  className: string;
  error?: string;
};
type TimeStampProp = {
  start: number;
  end: number;
  block: string;
};

export type {
  UserInfo,
  Task,
  PageViewLog,
  ScheduledSegment,
  TimerDisplay,
  TaskDisplay,
  InputFieldProps,
  TimeStampProp,
};
