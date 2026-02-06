// src/store/useUIStore.ts
import { create } from "zustand";

// フェーズの定義:
// initial: 初期状態（非表示）
// mv-playing: メインビジュアル（MV）のアニメーション中
// header-entry: MV完了後、ヘッダーが参入する段階
// ready: スクロールインジケータが表示され、全機能が有効化された状態
type AnimationPhase = "initial" | "mv-playing" | "header-entry" | "ready";

type UIState = {
  phase: AnimationPhase;
  setPhase: (phase: AnimationPhase) => void;
}

export const useUIStore = create<UIState>((set) => ({
  phase: "initial", // 初期値
  setPhase: (phase) => set({ phase }),
}));
