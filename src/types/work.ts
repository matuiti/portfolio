// src/types/work.ts

/** 内部管理用のカテゴリID */
export type WorkCategory = "web" | "wordpress" | "app" | "game" | "client" | "nda";

/** フィルタ用 (カテゴリ + all) */
export type WorkFilterCategory = WorkCategory | "all";

/** 公開レベルの定義 */
export type DisclosureLevel = "Full" | "NDA";

export type Work = {
  id: string;
  title: string;
  category: WorkCategory[];
  tags: string[];
  thumbnail?: string;
  images?: string[];
  summary: string; // カード用の短い説明

  role: string; // 担当役割
  duration: string; // 制作期間
  disclosureLevel: DisclosureLevel; // 公開範囲

  url?: string;
  articleUrl?: string;
  github?: string;
  siteId?: string; // サイト閲覧用ID
  sitePassword?: string; // サイト閲覧用パスワード

  background?: string; // ご依頼の背景・課題
  features?: string[]; // 実装機能
  points?: string[]; // 制作のポイント
};
