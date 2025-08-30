import { useSetAtom } from 'jotai';
import { currentTaskAtom, defaultTask } from '@/store/taskAtoms';
import type { Task } from '@/store/taskAtoms';

const useTask = () => {
  const setCurrentTask = useSetAtom(currentTaskAtom);

  const setTask = (task: { taskName: string; workTimeRef: number; breakTimeRef: number }) => {
    const newTask: Task = {
      id: Date.now(),
      taskName: task.taskName,
      workTimeRef: task.workTimeRef,
      breakTimeRef: task.breakTimeRef,
      pageViewLog: [],
    };

    setCurrentTask(newTask);
  };

  const resetTask = () => setCurrentTask(defaultTask());
  const resetPageViewLog = () => {
    setCurrentTask((prev: Task) => ({ ...prev, pageViewLog: [] }));
  };

  const updatePageViewLog = (log: { visible: boolean; timestamp: number }) => {
    setCurrentTask((prev) => ({
      ...prev,
      pageViewLog: [...(prev.pageViewLog || []), log],
    }));
  };

  return { setTask, resetTask, resetPageViewLog, updatePageViewLog };
};

export { useTask };
