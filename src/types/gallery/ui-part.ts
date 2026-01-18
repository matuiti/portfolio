// src/types/gallery/ui-part.ts

import { Category } from "./category";


export interface UIPart {
  id: string;
  category: Category; // stringではなくCategory型を直接使う
  title: string;
  description: string;
  difficulty: "basic" | "advanced" | "expert";
  tags: string[];
  features: string[];
  techStack: string[];
  path: string;
  codes: {
    html: string;
    css: string;
    js: string;
  };
}

// difficulty値
// basic → HTML/CSS中心の軽めの実装
// advanced → JSやアニメーションを含む中級実装
// expert → 複雑な動き・高度な構造・ライブラリ活用など上級実装
