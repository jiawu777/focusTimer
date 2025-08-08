import { z } from 'zod';
import { atomWithReset } from 'jotai/utils';
import { defaultTask } from '@/constants/storage';
import { loadTaskFromStorage } from '@/store/utils/LocalStorage';

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

const currentTaskAtom = atomWithReset<Task>(loadTaskFromStorage());
const resetTaskAtom = atomWithReset<Task>(defaultTask());

export { currentTaskAtom, resetTaskAtom };
export type { Task, PageViewLog };
export { TaskSchema };
