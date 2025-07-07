import { useRef, useState } from 'react';
import { useSetAtom } from 'jotai';
import { addTaskAtom, showSettingModalAtom, stopwatchAtom } from '@/atoms/taskAtoms';

interface Errors {
  task?: string;
  workTime?: string;
  breakTime?: string;
}

const useInputData = () => {
  const taskNameRef = useRef<HTMLInputElement>(null);
  const workTimeRef = useRef<HTMLInputElement>(null);
  const breakTimeRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Errors>({});
  const addTask = useSetAtom(addTaskAtom);
  const setShowSettingModal = useSetAtom(showSettingModalAtom);
  const resetTimer = useSetAtom(stopwatchAtom);

  const validate = (): Errors => {
    const newErrors: Errors = {};
    const task = taskNameRef.current?.value.trim();
    const workTime = Number(workTimeRef.current?.value);
    const breakTime = Number(breakTimeRef.current?.value);

    if (!task) newErrors.task = '請輸入任務名稱';
    if (!workTime || isNaN(workTime)) newErrors.workTime = '請輸入預計每循環工作時長(分鐘)';
    if (!breakTime || isNaN(breakTime)) newErrors.breakTime = '請輸入預計每循環休息時長(分鐘)';

    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    // prevent default render
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newTask = {
      id: Date.now(),
      taskName: taskNameRef.current!.value.trim(),
      workTimeRef: Number(workTimeRef.current!.value),
      breakTimeRef: Number(breakTimeRef.current!.value),
    };

    // addNewTask(newTask);
    addTask(newTask);

    // reset value
    if (taskNameRef.current) taskNameRef.current.value = '';
    if (workTimeRef.current) workTimeRef.current.value = '';
    if (breakTimeRef.current) breakTimeRef.current.value = '';
    setErrors({});
    setShowSettingModal(false);
    // resetTimer;
    resetTimer(0);
  };

  return {
    taskNameRef,
    workTimeRef,
    breakTimeRef,
    errors,
    handleSubmit,
  };
};

export { useInputData };
