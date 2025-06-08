import { useAtom, useSetAtom } from 'jotai';
import {
  timerStateAtom,
  timeLeftAtom,
  DEFAULT_BREAKTIME,
  DEFAULT_WORKTIME,
  showModalAtom,
} from '@/atoms/taskAtoms';

const useCycle = () => {
  const [state, setState] = useAtom(timerStateAtom);
  const [showModal, setShowModal] = useAtom(showModalAtom);
  const setTimeLeft = useSetAtom(timeLeftAtom);
  const switchState = () => {
    if (state === 'work') {
      setState('break');
      setTimeLeft(DEFAULT_BREAKTIME);
      setShowModal(true);
    } else {
      setState('work');
      setTimeLeft(DEFAULT_WORKTIME);
    }
  };

  return { state, switchState, showModal };
};

export { useCycle };
