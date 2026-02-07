// src/types/work.ts
export type WorkCategory = "web" | "app" | "game" | "all";

export type Work = {
  id: string;
  title: string;
  category: WorkCategory;
  tags: string[];
  thumbnail: string; // public/assets/images/works/ 等へのパス [cite: 10]
  description?: string; // 詳細ページ用
  url?: string; // プロジェクトURL
  github?: string; // リポジトリURL
};