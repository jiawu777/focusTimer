import { z } from 'zod';

const TaskSchema = z.object({
  id: z.number(),
  taskName: z.string(),
  workTimeRef: z.number(),
  breakTimeRef: z.number(),
  pageViewLog: z
    .array(
      z.object({
        visible: z.boolean(),
        timestamp: z.number(),
      })
    )
    .optional(),
});

const UserInfoSchema = z.object({
  tasks: z.array(TaskSchema),
  currentTaskId: z.number(),
});

const PageViewLogSchema = z.object({
  visible: z.boolean(),
  timestamp: z.number(),
});

const ScheduledSegmentSchema = z.object({
  state: z.enum(['work', 'break']),
  percent: z.number(),
  start: z.number(),
  end: z.number(),
});

export { UserInfoSchema, TaskSchema, PageViewLogSchema, ScheduledSegmentSchema };
