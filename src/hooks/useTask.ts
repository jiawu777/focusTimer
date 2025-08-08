import { useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { currentTaskAtom, resetTaskAtom } from '@/store/atoms/taskAtoms';
import { showModalAtom, modalTypeAtom } from '@/store/atoms/modalAtoms';
import { saveTaskToStorage } from '@/store/utils/LocalStorage';
import { defaultTask } from '@/constants/storage';
import type { Task } from '@/store/atoms/taskAtoms';

const useTask = () => {
  const setCurrentTask = useSetAtom(currentTaskAtom);
  const setShowModal = useSetAtom(showModalAtom);
  const setModalType = useSetAtom(modalTypeAtom);

  const setTask = (task: { taskName: string; workTimeRef: number; breakTimeRef: number }) => {
    const newTask: Task = {
      id: Date.now(),
      taskName: task.taskName,
      workTimeRef: task.workTimeRef,
      breakTimeRef: task.breakTimeRef,
      pageViewLog: [],
    };

    // Save to local storage
    saveTaskToStorage(newTask);

    // Update current task atom
    setCurrentTask(newTask);

    // Close modal after setting task
    setShowModal(false);
    setModalType(null); // Clear modal type if needed
  };

  const resetTask = useResetAtom(resetTaskAtom);
  const resetAndSyncTask = () => {
    resetTask(); // Reset atom state
    // Get default value (initial value of resetTaskAtom)
    saveTaskToStorage(defaultTask()); // Sync to localStorage
  };

  const resetPageViewLog = () => {
    setCurrentTask((prev) => {
      const updatedTask = { ...prev, pageViewLog: [] };
      saveTaskToStorage(updatedTask); // Save updated task to localStorage
      return updatedTask;
    });
    setShowModal(false); // Close modal if needed
    setModalType(null);
  };

  const updatePageViewLog = (log: { visible: boolean; timestamp: number }) => {
    setCurrentTask((prev) => {
      const updatedTask = { ...prev, pageViewLog: [...(prev.pageViewLog || []), log] };
      saveTaskToStorage(updatedTask); // Save updated task to localStorage
      return updatedTask;
    });
  };

  return { setTask, resetAndSyncTask, resetPageViewLog, updatePageViewLog };
};

export { useTask };
