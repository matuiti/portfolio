// src/store/useUIStore.ts

import { create } from "zustand";

type AnimationPhase = "initial" | "playing" | "ready";

type UIState = {
  phase: AnimationPhase;
  setPhase: (phase: AnimationPhase) => void;
  // 検索ドロワーの開閉状態
  isSearchDrawerOpen: boolean;
  setSearchDrawerOpen: (isOpen: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  phase: "initial",
  setPhase: (phase) => set({ phase }),

  // 初期値は閉じている状態
  isSearchDrawerOpen: false,
  setSearchDrawerOpen: (isOpen) => set({ isSearchDrawerOpen: isOpen }),
}));
