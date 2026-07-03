import { create } from 'zustand';
import { GlobalState } from '@/types/globalState';

export const useStore = create<GlobalState>((set) => ({
  phase: 'initial',
  setPhase: (phase) => set({ phase }),
  isSearchDrawerOpen: false,
  setSearchDrawerOpen: (isOpen) => set({ isSearchDrawerOpen: isOpen }),
  contactStatus: 'idle',
  setContactStatus: (status) => set({ contactStatus: status }),
}));
