import { z } from 'zod';
import {
  UserInfoSchema,
  TaskSchema,
  PageViewLogSchema,
  ScheduledSegmentSchema,
} from '../schema/schema';

type UserInfo = z.infer<typeof UserInfoSchema>;
type Task = z.infer<typeof TaskSchema>;
type PageViewLog = z.infer<typeof PageViewLogSchema>;
type ScheduledSegment = z.infer<typeof ScheduledSegmentSchema>;

export type { UserInfo, Task, PageViewLog, ScheduledSegment };
