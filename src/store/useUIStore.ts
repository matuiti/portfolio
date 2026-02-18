// src/store/useUIStore.ts
import { create } from "zustand";

// アニメーションフェーズの型
type AnimationPhase = "initial" | "playing" | "ready";

// フォーム送信状態の型 [1, 2]
type ContactStatus = "idle" | "submitting" | "success" | "error";

type UIState = {
  phase: AnimationPhase;
  setPhase: (phase: AnimationPhase) => void;
  // 検索ドロワーの開閉状態 [6]
  isSearchDrawerOpen: boolean;
  setSearchDrawerOpen: (isOpen: boolean) => void;
  // コンタクトフォームの状態管理 [1, 2]
  contactStatus: ContactStatus;
  setContactStatus: (status: ContactStatus) => void;
};

export const useUIStore = create<UIState>((set) => ({
  phase: "initial",
  setPhase: (phase) => set({ phase }),
  isSearchDrawerOpen: false,
  setSearchDrawerOpen: (isOpen) => set({ isSearchDrawerOpen: isOpen }),
  // コンタクトフォームの初期状態
  contactStatus: "idle",
  setContactStatus: (status) => set({ contactStatus: status }),
}));
