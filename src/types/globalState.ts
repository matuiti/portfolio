type AnimationPhase = 'initial' | 'playing' | 'ready';
type ContactStatus = 'idle' | 'submitting' | 'success' | 'error';

export type GlobalState = {
  phase: AnimationPhase;
  setPhase: (phase: AnimationPhase) => void;
  isSearchDrawerOpen: boolean;
  setSearchDrawerOpen: (isOpen: boolean) => void;
  contactStatus: ContactStatus;
  setContactStatus: (status: ContactStatus) => void;
};
