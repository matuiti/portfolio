// src/types/gallery/ui-part.ts

import { Category } from "./category";

/**
 * UIパーツの型定義
 * difficulty(難易度)の選択基準の参考に：（basic）HTML/CSS中心の軽めの実装 |（advanced）JSやアニメーションを含む中級実装 |（expert）複雑な動き・高度な構造・ライブラリ活用など上級実装
 */
export type UIPart = {
  id: string;
  category: Category;
  title: string;
  description: string;
  difficulty: "basic" | "advanced" | "expert";
  tags: string[];
  features: string[];
  techStack: string[];
  path: string;
  code: {
    html: string;
    css: string;
    js: string;
  };
};