import { atom } from 'jotai';
import { z } from 'zod';

type UserInfo = z.infer<typeof UserInfoSchema>;
type Task = {
  id: number;
  taskName: string;
  estimateWorkTime: number;
  estimateBreakTime: number;
  estimateCycle: number;
  usedCycle: number;
  completed: boolean;
  startTime?: number | null; // Optional start time for the task
};

const TaskSchema = z.object({
  id: z.number(),
  taskName: z.string(),
  estimateWorkTime: z.number(),
  estimateBreakTime: z.number(),
  estimateCycle: z.number(),
  usedCycle: z.number(),
  completed: z.boolean(),
  startTime: z.number().nullable().optional(),
});

const UserInfoSchema = z.object({
  tasks: z.array(TaskSchema),
  currentTaskId: z.number(),
});

// configure
const STORAGE_KEY = 'userInfo';
const DEFAULT_WORKTIME = 25 * 60;
const DEFAULT_BREAKTIME = 5 * 60;
const DEFAULT_BREAKTEXT = 'Break time!';
const DEFAULT_TASK = 'Focus Time!';
const DEFAULT_estimateCycle = 1;

// default
const defaultUserInfo: UserInfo = {
  tasks: [],
  currentTaskId: 0,
};

// state
const timerStateAtom = atom<'work' | 'break'>('work');
const showModalAtom = atom(false); // control focus time modal visibility
const isRunning = atom(false);
const timeLeftAtom = atom(DEFAULT_WORKTIME);

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

// currentTaskAtom
const currentTaskAtom = atom((get) => {
  const userInfo = get(userInfoAtom);
  const task = userInfo.tasks.find((task) => {
    return task.id === userInfo.currentTaskId;
  });
  return {
    taskName: task?.taskName || DEFAULT_TASK,
    estimateWorkTime: task?.estimateWorkTime || DEFAULT_WORKTIME,
    estimateBreakTime: task?.estimateBreakTime || DEFAULT_BREAKTIME,
    estimateCycle: task?.estimateCycle || DEFAULT_estimateCycle,
    usedCycle: task?.usedCycle || 0,
  };
});

// addTaskAtom
const addTaskAtom = atom(
  null,
  (
    get,
    set,
    task: {
      taskName: string;
      estimateWorkTime: number;
      estimateBreakTime: number;
      estimateCycle: number;
    }
  ) => {
    const prev = get(userInfoAtom);
    const newTask: Task = {
      id: Date.now(),
      taskName: task.taskName,
      estimateWorkTime: task.estimateWorkTime * 60,
      estimateBreakTime: task.estimateBreakTime * 60,
      estimateCycle: task.estimateCycle,
      usedCycle: 0,
      completed: false,
    };

    const updateData = {
      ...prev,
      tasks: [...prev.tasks, newTask],
      currentTaskId: newTask.id,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updateData));
    set(userInfoAtom, updateData);
    set(timeLeftAtom, newTask.estimateWorkTime); // Reset time left to the new task's work time
  }
);

// addUsedCycleAtom
const addUsedCycleAtom = atom(null, (get, set) => {
  const userInfo = get(userInfoAtom);
  const updatedTasks = userInfo.tasks.map((task) => {
    if (task.id === userInfo.currentTaskId) {
      return {
        ...task,
        usedCycle: task.usedCycle + 1,
      };
    }
    return task;
  });

  const updatedUserInfo = {
    ...userInfo,
    tasks: updatedTasks,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUserInfo));
  set(userInfoAtom, updatedUserInfo);
});

//startTimeAtom
const startTimeAtom = atom<number | null>(null);

// taskStartTimeAtom
const setTaskStartTimeAtom = atom(null, (get, set, startTime: number) => {
  const userInfo = get(userInfoAtom);
  const updatedTasks = userInfo.tasks.map((task) =>
    task.id === userInfo.currentTaskId ? { ...task, startTime } : task
  );
  const updatedUserInfo = {
    ...userInfo,
    tasks: updatedTasks,
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUserInfo));
  set(userInfoAtom, updatedUserInfo);
});

export {
  timerStateAtom,
  isRunning,
  timeLeftAtom,
  userInfoAtom,
  currentTaskAtom,
  addTaskAtom,
  addUsedCycleAtom,
  DEFAULT_WORKTIME,
  DEFAULT_BREAKTIME,
  DEFAULT_BREAKTEXT,
  showModalAtom,
  startTimeAtom,
  setTaskStartTimeAtom,
};
