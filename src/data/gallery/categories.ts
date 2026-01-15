import { Category } from "@/types/gallery/category";

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "button", label: "ボタン" },
  { id: "card", label: "カード" },
  { id: "form", label: "フォーム" },
  { id: "modal", label: "モーダル" },
  { id: "navigation", label: "ナビゲーション" },
  { id: "list", label: "リスト / テーブル" },
  { id: "loading", label: "ローディング" },
  { id: "transition", label: "トランジション" },
  { id: "scroll", label: "スクロール演出" },
  { id: "layout", label: "レイアウト" },
  { id: "other", label: "その他" },
] as const;
