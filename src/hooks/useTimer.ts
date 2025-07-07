import { useRef, useEffect } from 'react';
import { useAtom } from 'jotai';
import { isRunning, stopwatchAtom } from '@/atoms/taskAtoms';

const useTimer = () => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useAtom(stopwatchAtom);
  const [running, setRunning] = useAtom(isRunning);

  // 正數計時器
  useEffect(() => {
    clearInterval(timerRef.current!);
    if (running) {
      timerRef.current = setInterval(() => {
        setTimer((prev: number) => {
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current!);
      setRunning(false);
    }
  }, [running]);

  // 切換計時器開關
  const toggleTimer = () => {
    const runningStatus = !running;
    setRunning(runningStatus);
  };

  //重置計時器
  const resetTimer = () => {
    clearInterval(timerRef.current!);
    setRunning(false);
  };

  return {
    timer,
    running,
    toggleTimer,
    resetTimer,
  };
};

export { useTimer };
