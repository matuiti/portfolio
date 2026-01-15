import { Category } from "./category";

export interface UIPart {
  id: string; // 'button01' など
  category: Category; // 'button'
  title: string; // 'グラデーションボタン'
  description: string; // 説明文
  tags: string[]; // タグ（複数）
  difficulty: "basic" | "intermediate" | "advanced";
  path: string; // iframe src 用パス（public/ からの相対パス）
  thumbnail?: string; // 必要なら
  createdAt?: string; // 任意
}
