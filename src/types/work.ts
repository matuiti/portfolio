// src/types/work.ts

/**
 * データが持つカテゴリ（Allは含めない）
 */
export type WorkCategory = "Web制作" | "WordPress" | "Next.js" | "スポット修正";

/**
 * 検索UI用のカテゴリ（Allを含める）
 */
export type WorkFilterCategory = WorkCategory | "All";

export type Work = {
  id: string;
  /**
   * エラー解消：以前の型定義では 'title' が必須でしたが、
   * 新しい設計の 'displayTitle' と 'summary' に合わせて更新します。
   */
  displayTitle: string;
  category: WorkCategory[];
  tags: string[];
  thumbnail: string;
  summary: string; // カードに表示する短い説明
  description?: string; // モーダル等で表示する詳細
  duration: string;
  role: string;
  url?: string;
  github?: string;
};
