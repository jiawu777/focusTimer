import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  timerStateAtom,
  timeLeftAtom,
  DEFAULT_BREAKTIME,
  DEFAULT_WORKTIME,
  showModalAtom,
  currentTaskAtom,
} from '@/atoms/taskAtoms';

const useCycle = () => {
  const [state, setState] = useAtom(timerStateAtom);
  const [showModal, setShowModal] = useAtom(showModalAtom);
  const currentTask = useAtomValue(currentTaskAtom);
  const setTimeLeft = useSetAtom(timeLeftAtom);
  const switchState = () => {
    if (state === 'work') {
      setState('break');
      setTimeLeft(currentTask.estimateBreakTime || DEFAULT_BREAKTIME);
      setShowModal(true);
    } else {
      setState('work');
      setTimeLeft(currentTask.estimateWorkTime || DEFAULT_WORKTIME);
    }
  };

  return { state, switchState, showModal };
};

export { useCycle };
