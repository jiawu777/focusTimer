import { z } from 'zod';
import { atomWithStorage } from 'jotai/utils';
import { LOCAL_STORAGE_KEY } from '@/store/access';

const DEFAULT_TASK = 'Time to focus!'; //
const DEFAULT_WORKTIME = 25 * 60; // minutes
const DEFAULT_BREAKTIME = 5 * 60; // minutes

const defaultTask = (): Task => ({
  id: Date.now(),
  taskName: DEFAULT_TASK,
  workTimeRef: DEFAULT_WORKTIME,
  breakTimeRef: DEFAULT_BREAKTIME,
  pageViewLog: [],
});

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

const pageViewLogSchema = z.object({
  visible: z.boolean(),
  timestamp: z.number(),
});
type Task = z.infer<typeof TaskSchema>;
type PageViewLog = z.infer<typeof pageViewLogSchema>;

const currentTaskAtom = atomWithStorage<Task>(LOCAL_STORAGE_KEY.UserInfo, defaultTask());

export { currentTaskAtom, DEFAULT_TASK, DEFAULT_WORKTIME, DEFAULT_BREAKTIME, defaultTask };
export type { Task, PageViewLog };
export { TaskSchema };
