// src/store/useUIStore.ts
import { create } from "zustand";

// 演出のフェーズ定義
// initial: 非表示 | mv-playing: MV再生中 | header-entry: ヘッダー参入 | ready: 全表示完了
type AnimationPhase = "initial" | "mv-playing" | "header-entry" | "ready";

type UIState = {
  phase: AnimationPhase;
  setPhase: (phase: AnimationPhase) => void;
}

export const useUIStore = create<UIState>((set) => ({
  phase: "initial", // 初期値
  setPhase: (phase) => set({ phase }),
}));
