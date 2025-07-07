import { atom } from 'jotai';
import { z } from 'zod';

// types
type UserInfo = z.infer<typeof UserInfoSchema>;

type Task = {
  id: number;
  taskName: string;
  workTimeRef: number;
  breakTimeRef: number;
  pageViewLog?: PageViewLog[];
};

type PageViewLog = {
  visible: boolean;
  timestamp: number;
};

// schema
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

// configure
const STORAGE_KEY = 'userInfo';
const DEFAULT_TASK = 'Time to focus!';
const DEFAULT_WORKTIME = 25 * 60; // minutes
const DEFAULT_BREAKTIME = 5 * 60; // minutes

// default
const defaultUserInfo: UserInfo = {
  tasks: [],
  currentTaskId: 0,
};

// state
const timerStateAtom = atom<'work' | 'break'>('work');
const isRunning = atom(false);
const stopwatchAtom = atom(0);

// function
const getUserInfo = (): UserInfo => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultUserInfo;
    const parsedData = JSON.parse(stored);
    return UserInfoSchema.parse(parsedData);
  } catch (e) {
    console.warn('Invalid user info in localStorage, resetting...', e);
    localStorage.removeItem(STORAGE_KEY);
    return defaultUserInfo;
  }
};

const userInfoAtom = atom<UserInfo>(getUserInfo());
const showSettingModalAtom = atom(false);
const showAnalyticsModalAtom = atom(false);

const currentTaskAtom = atom((get) => {
  const userInfo = get(userInfoAtom);
  const task = userInfo.tasks.find((task) => {
    return task.id === userInfo.currentTaskId;
  });
  return {
    taskName: task?.taskName || DEFAULT_TASK,
    workTimeRef: task?.workTimeRef || DEFAULT_WORKTIME,
    breakTimeRef: task?.breakTimeRef || DEFAULT_BREAKTIME,
    pageViewLog: task?.pageViewLog || null,
  };
});

const addTaskAtom = atom(
  null,
  (get, set, task: { taskName: string; workTimeRef: number; breakTimeRef: number }) => {
    const prev = get(userInfoAtom);
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

const updatePageViewAtom = atom(null, (get, set, log: PageViewLog) => {
  const userInfo = get(userInfoAtom);
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

export {
  timerStateAtom,
  isRunning,
  stopwatchAtom,
  userInfoAtom,
  currentTaskAtom,
  addTaskAtom,
  DEFAULT_WORKTIME,
  DEFAULT_BREAKTIME,
  showSettingModalAtom,
  updatePageViewAtom,
  showAnalyticsModalAtom,
};
export type { PageViewLog };
