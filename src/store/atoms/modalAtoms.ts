import { atom } from 'jotai';

const showModalAtom = atom(false);

enum ModalType {
  ProgressBar = 'ProgressBar',
  SetTask = 'SetTask',
  Analytics = 'Analytics',
  NoData = 'NoData',
}
const modalTypeAtom = atom<ModalType | null>(null);

export { showModalAtom, modalTypeAtom, ModalType };
