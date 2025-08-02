import { atom } from 'jotai';
import { z } from 'zod';
import { STORAGE_KEY } from '@/constants/storage';
import { userInfoAtom } from './userAtoms';
import { showAnalyticsModalAtom } from './modalAtoms';

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

type Task = z.infer<typeof TaskSchema>;
type UserInfo = z.infer<typeof UserInfoSchema>;
type PageViewLog = z.infer<typeof PageViewLogSchema>;

const addTaskAtom = atom(
  null,
  (get, set, task: { taskName: string; workTimeRef: number; breakTimeRef: number }) => {
    const prev = get(userInfoAtom) as UserInfo;
    const newTask: Task = {
      id: Date.now(),
      taskName: task.taskName,
      workTimeRef: task.workTimeRef,
      breakTimeRef: task.breakTimeRef,
      pageViewLog: [],
    };

    const updateData = {
      ...prev,
      tasks: [...prev.tasks, newTask],
      currentTaskId: newTask.id,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updateData));
    set(userInfoAtom, updateData);
  }
);

const clearTaskAtom = atom(null, (get, set) => {
  const userInfo = get(userInfoAtom) as UserInfo;
  if (userInfo.currentTaskId === null) return;
  const updateData = {
    tasks: [],
    currentTaskId: 0,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updateData));
  set(userInfoAtom, updateData);
});

const clearPageViewLogAtom = atom(null, (get, set) => {
  const userInfo = get(userInfoAtom) as UserInfo;
  const updatedTasks = userInfo.tasks.map((task) => {
    if (task.id === userInfo.currentTaskId) {
      return {
        ...task,
        pageViewLog: [],
      };
    }
    return task;
  });
  const updateData = {
    ...userInfo,
    tasks: updatedTasks,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updateData));
  set(userInfoAtom, updateData);
  set(showAnalyticsModalAtom, false);
});

const updatePageViewAtom = atom(null, (get, set, log: PageViewLog) => {
  const userInfo = get(userInfoAtom) as UserInfo;
  const updatedTasks = userInfo.tasks.map((task) => {
    if (task.id === userInfo.currentTaskId) {
      return {
        ...task,
        pageViewLog: [...(task.pageViewLog ?? []), log],
      };
    }
    return task;
  });
  const updateData = {
    ...userInfo,
    tasks: updatedTasks,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updateData));
  set(userInfoAtom, updateData);
});

export { addTaskAtom, clearTaskAtom, updatePageViewAtom, clearPageViewLogAtom };
export type { Task, UserInfo, PageViewLog };
export { TaskSchema, UserInfoSchema, PageViewLogSchema };
