import { atom } from 'jotai';

const timerStateAtom = atom<'work' | 'break'>('work');
const isRunning = atom(false);
const stopwatchAtom = atom(0);

export { timerStateAtom, isRunning, stopwatchAtom };
