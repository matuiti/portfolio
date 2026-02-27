// src/types/work.ts

/** 内部管理用のカテゴリID */
export type WorkCategory = "web" | "wordpress" | "app" | "game" | "client" | "nda";

/** フィルタ用 (カテゴリ + all) */
export type WorkFilterCategory = WorkCategory | "all";

/** 公開レベルの定義 [cite: 7] */
export type DisclosureLevel = "Full" | "NDA";

export type Work = {
  id: string;
  title: string;
  category: WorkCategory[];
  tags: string[];
  thumbnail: string;
  images?: string[];
  summary: string; // カード用の短い説明 [cite: 7, 16]
  duration: string; // 制作期間 [cite: 7, 16]
  role: string; // 担当役割 [cite: 7, 16]

  disclosureLevel: DisclosureLevel;
  isSpeedyWork: boolean;
  isLongTerm: boolean; // 中長期プロジェクト（Accomplished）用フラグ

  url?: string;
  github?: string;
  description?: string; // 詳細ページ・モーダル用 [cite: 131]
};
