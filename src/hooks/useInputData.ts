import { useRef, useState } from 'react';
import { useSetAtom } from 'jotai';
import { addTaskAtom } from '@/atoms/taskAtoms';

interface Errors {
  task?: string;
  estimateWorkTime?: string;
  estimateBreakTime?: string;
  estimateCycle?: string;
}

const useInputData = () => {
  const taskNameRef = useRef<HTMLInputElement>(null);
  const estimateCycleRef = useRef<HTMLInputElement>(null);
  const estimateWorkTimeRef = useRef<HTMLInputElement>(null);
  const estimateBreakTimeRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const addTask = useSetAtom(addTaskAtom);

  const validate = (): Errors => {
    const newErrors: Errors = {};
    const task = taskNameRef.current?.value.trim();
    const estimateCycle = Number(estimateCycleRef.current?.value);
    const estimateWorkTime = Number(estimateWorkTimeRef.current?.value);
    const estimateBreakTime = Number(estimateBreakTimeRef.current?.value);

    if (!task) newErrors.task = '請輸入任務名稱';
    if (isNaN(estimateWorkTime) || estimateWorkTime < 1)
      newErrors.estimateWorkTime = '請輸入正確的工作時間(至少1)';
    if (isNaN(estimateBreakTime) || estimateBreakTime < 1)
      newErrors.estimateBreakTime = '請輸入正確的休息時間(至少1)';
    if (isNaN(estimateCycle) || estimateCycle < 1)
      newErrors.estimateCycle = '請輸入正確的循環數(至少1)';

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
      taskName: String(taskNameRef.current!.value.trim()),
      estimateWorkTime: Number(estimateWorkTimeRef.current!.value),
      estimateBreakTime: Number(estimateBreakTimeRef.current!.value),
      estimateCycle: Number(estimateCycleRef.current!.value),
      completed: false,
    };

    // addNewTask(newTask);
    addTask(newTask);

    // reset value
    if (taskNameRef.current) taskNameRef.current.value = '';
    if (estimateCycleRef.current) estimateCycleRef.current.value = '';
    if (estimateWorkTimeRef.current) estimateWorkTimeRef.current.value = '';
    if (estimateBreakTimeRef.current) estimateBreakTimeRef.current.value = '';

    setErrors({});
  };

  return {
    taskNameRef,
    estimateWorkTimeRef,
    estimateBreakTimeRef,
    estimateCycleRef,
    errors,
    handleSubmit,
  };
};

export { useInputData };
