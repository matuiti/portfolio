// src/app/(home)/components/ScrollRevealManager.tsx
"use client";

import { useScrollReveal } from "@/lib/hooks/useScrollReveal";

/**
 * トップページ全体のスクロール演出（Revealアニメーション）を一括管理するコンポーネント。
 * UIは持たず、クライアントサイドで演出フックを実行する責務を持つ。
 */
export const ScrollRevealManager = () => {
  // 作成した共通フックを呼び出す
  useScrollReveal();

  // 何もレンダリングしない
  return null;
};
