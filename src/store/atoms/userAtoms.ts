import { atom } from 'jotai';
import {
  STORAGE_KEY,
  DEFAULT_TASK,
  DEFAULT_WORKTIME,
  DEFAULT_BREAKTIME,
} from '@/constants/storage';
import type { UserInfo } from './taskAtoms';
import { UserInfoSchema } from './taskAtoms';

// configure
const defaultUserInfo: UserInfo = {
  tasks: [],
  currentTaskId: 0,
};

// function
const getUserInfo = (): UserInfo => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultUserInfo;
    const parsedData = JSON.parse(stored);
    return UserInfoSchema.parse(parsedData);
  } catch (e) {
    console.warn('Invalid user info in localStorage, resetting...', e);
    localStorage.removeItem(STORAGE_KEY);
    return defaultUserInfo;
  }
};
const userInfoAtom = atom<UserInfo>(getUserInfo());
const currentTaskAtom = atom((get) => {
  const userInfo = get(userInfoAtom);
  const task = userInfo.tasks.find((task) => {
    return task.id === userInfo.currentTaskId;
  });
  return {
    taskName: task?.taskName || DEFAULT_TASK,
    workTimeRef: task?.workTimeRef || DEFAULT_WORKTIME,
    breakTimeRef: task?.breakTimeRef || DEFAULT_BREAKTIME,
    pageViewLog: task?.pageViewLog || null,
  };
});

export { userInfoAtom, currentTaskAtom };
