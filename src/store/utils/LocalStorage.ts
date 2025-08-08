import { STORAGE_KEY, defaultTask } from '@/constants/storage';
import type { Task } from '@/store/atoms/taskAtoms';
import { TaskSchema } from '@/store/atoms/taskAtoms';

function saveTaskToStorage(task: Task) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(task));
}
function loadTaskFromStorage(): Task {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultTask();
  try {
    return TaskSchema.parse(JSON.parse(stored));
  } catch (e) {
    console.warn('Invalid task data in localStorage, resetting...', e);
    localStorage.removeItem(STORAGE_KEY);
    return defaultTask();
  }
}

export { saveTaskToStorage, loadTaskFromStorage };
