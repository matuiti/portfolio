import { TagGroup } from "@/types/gallery/tag";

export const TAG_GROUPS: Record<string, TagGroup> = {
  motion: {
    label: "動き",
    icon: "✨",
    tags: [
      "ホバー",
      "アニメーション",
      "トランジション",
      "スクロール演出",
      "マイクロインタラクション",
    ],
  },
  style: {
    label: "スタイル",
    icon: "🎨",
    tags: [
      "グラデーション",
      "ガラス風",
      "影",
      "ぼかし",
      "ダーク",
      "ライト",
      "3D",
      "ニューモーフィズム",
    ],
  },
  implementation: {
    label: "実装方法",
    icon: "⚙️",
    tags: [
      "CSSのみ",
      "CSS + Vanilla JS",
      "SCSS使用",
      "GSAP",
      "ScrollTrigger",
      "anime.js",
      "Three.js",
      "Lottie",
      "Canvas",
      "SVG",
      "WebGL",
      "IntersectionObserver",
      "CSS Grid",
      "Flexbox",
    ],
  },
  utility: {
    label: "特徴",
    icon: "🔧",
    tags: [
      "レスポンシブ",
      "アクセシブル",
      "ミニマル",
      "モダン",
      "軽量",
      "パフォーマンス重視",
    ],
  },
} as const;
