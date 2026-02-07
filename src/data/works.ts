// src/data/works.ts
import { Work } from "@/types/work";

export const ALL_WORKS: Work[] = [
  {
    id: "w-01",
    displayTitle: "モダンECフロントエンド基盤",
    category: ["Next.js"],
    tags: ["Next.js", "TypeScript", "App Router", "Tailwind CSS", "Zustand"],
    thumbnail: "/assets/images/works/ec-next.jpg",
    summary:
      "Next.js App Routerを採用した、大規模ECサイトのフロントエンドリニューアル。",
    duration: "4ヶ月",
    role: "リードエンジニア",
    github: "https://github.com/your-id/next-ec-project",
    url: "https://example-ec.com",
  },
  {
    id: "w-02",
    displayTitle: "老舗旅館 公式コーポレートサイト",
    category: ["WordPress", "Web制作"],
    tags: ["WordPress", "PHP", "Sass", "BEM", "GSAP"],
    thumbnail: "/assets/images/works/ryokan-wp.jpg",
    summary:
      "カスタムブロックを多用し、運用性を極めたフルカスタムWordPressテーマ制作。",
    duration: "1.5ヶ月",
    role: "デザイン・コーディング",
    url: "https://example-ryokan.jp",
  },
  {
    id: "w-03",
    displayTitle: "不動産ポータル 検索速度改善",
    category: ["スポット修正", "Next.js"],
    tags: ["React", "Lighthouse", "Performance", "Optimization"],
    thumbnail: "/assets/images/works/speed-up.jpg",
    summary:
      "Core Web Vitalsの改善を目的とした、既存Reactアプリのチューニング。",
    duration: "1週間",
    role: "パフォーマンスアドバイザー",
    github: "https://github.com/your-id/performance-fix",
  },
  {
    id: "w-04",
    displayTitle: "採用キャンペーン特設LP",
    category: ["Web制作"],
    tags: ["HTML", "Sass", "JavaScript", "GSAP", "Three.js"],
    thumbnail: "/assets/images/works/recruitment-lp.jpg",
    summary:
      "WebGLを活用した動的な演出により、ブランドイメージを強化した特設サイト。",
    duration: "3週間",
    role: "メインコーディング",
    url: "https://example-lp.com/recruit",
  },
];
