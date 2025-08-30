import { atom } from 'jotai';
import { ModalVariant } from '@/components/common/Modal/Modal';

const openAtom = atom(false);
const modalTypeAtom = atom<ModalVariant | null>(null);

export { openAtom, modalTypeAtom };
