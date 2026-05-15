// src/store/useUIStore.ts
import { create } from 'zustand';

type AnimationPhase = 'initial' | 'playing' | 'ready';
type ContactStatus = 'idle' | 'submitting' | 'success' | 'error';

type UIState = {
  phase: AnimationPhase;
  setPhase: (phase: AnimationPhase) => void;
  isSearchDrawerOpen: boolean;
  setSearchDrawerOpen: (isOpen: boolean) => void;
  contactStatus: ContactStatus;
  setContactStatus: (status: ContactStatus) => void;
};

export const useUIStore = create<UIState>((set) => ({
  phase: 'initial',
  setPhase: (phase) => set({ phase }),
  isSearchDrawerOpen: false,
  setSearchDrawerOpen: (isOpen) => set({ isSearchDrawerOpen: isOpen }),
  contactStatus: 'idle',
  setContactStatus: (status) => set({ contactStatus: status }),
}));
