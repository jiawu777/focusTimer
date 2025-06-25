import { atom } from 'jotai';
import { z } from 'zod';

type UserInfo = z.infer<typeof UserInfoSchema>;
type Task = {
  id: number;
  taskName: string;
  workTimeRef: number;
  breakTimeRef: number;
};

const TaskSchema = z.object({
  id: z.number(),
  taskName: z.string(),
  workTimeRef: z.number(),
  breakTimeRef: z.number(),
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

const currentTaskAtom = atom((get) => {
  const userInfo = get(userInfoAtom);
  const task = userInfo.tasks.find((task) => {
    return task.id === userInfo.currentTaskId;
  });
  return {
    taskName: task?.taskName || DEFAULT_TASK,
    workTimeRef: task?.workTimeRef || DEFAULT_WORKTIME,
    breakTimeRef: task?.breakTimeRef || DEFAULT_BREAKTIME,
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
    };

    const updateData = {
      ...prev,
      tasks: [...prev.tasks, newTask],
      currentTaskId: newTask.id,
    };

    console.log(newTask);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updateData));
    set(userInfoAtom, updateData);
  }
);

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
};
