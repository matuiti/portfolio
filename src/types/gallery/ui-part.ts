import { Category } from "./category";

export interface UIPart {
  id: string; // 'button01' など
  category: Category; // 'button'
  title: string; // 'グラデーションボタン'
  description: string; // 説明文
  tags: string[]; // タグ（複数）
  difficulty: "basic" | "advanced " | "expert";
  path: string; // iframe src 用パス（public/ からの相対パス）

  // thumbnail?: string; // サムネイル画像
  // createdAt?: string; // 作成日
}

// difficulty値
// basic → HTML/CSS中心の軽めの実装
// advanced → JSやアニメーションを含む中級実装
// expert → 複雑な動き・高度な構造・ライブラリ活用など上級実装

