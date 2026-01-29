// src/types/navigation.ts
import { ReactNode } from "react";

export type NavItem = {
  label: string;
  href: string;
  icon?: ReactNode;
  isPublished?: boolean; // 公開済みかどうか
  isCurrent?: boolean; // 現在のページかどうか。コンポーネント側で判定して付与するフラグ
};

// ヘッダー用、フッター用などで型を分ける場合もここに追加
export type NavConfig = NavItem[];
