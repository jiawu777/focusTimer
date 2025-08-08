import type { Task } from '@/store/atoms/taskAtoms';

const STORAGE_KEY = 'userInfo';
const DEFAULT_TASK = 'Time to focus!';
const DEFAULT_WORKTIME = 25 * 60; // minutes
const DEFAULT_BREAKTIME = 5 * 60; // minutes
const defaultTask = (): Task => ({
  id: Date.now(),
  taskName: '',
  workTimeRef: DEFAULT_WORKTIME,
  breakTimeRef: DEFAULT_BREAKTIME,
  pageViewLog: [],
});

export { STORAGE_KEY, DEFAULT_TASK, DEFAULT_WORKTIME, DEFAULT_BREAKTIME, defaultTask };
