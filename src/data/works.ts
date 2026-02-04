// src/data/works.ts
import { Work } from "@/types/work";

export const ALL_WORKS: Work[] = [
  {
    id: "work-01",
    title: "Portfolio Site 2025",
    category: "web",
    tags: ["Next.js 16", "TypeScript", "Tailwind CSS"],
    thumbnail: "/assets/images/works/portfolio.jpg",
    url: "https://example.com",
    description:
      "本ポートフォリオサイトです。設計力と実装力を証明するために最新技術を採用しています。",
  },
  {
    id: "work-02",
    title: "Task Management App",
    category: "app",
    tags: ["React", "Firebase", "Zustand"],
    thumbnail: "/assets/images/works/task-app.jpg",
    url: "https://example.com/task-app",
    description: "直感的な操作性を重視したタスク管理アプリケーションです。",
  },
  {
    id: "work-03",
    title: "Neon Shooter",
    category: "game",
    tags: ["Canvas API", "Vanilla JS"],
    thumbnail: "/assets/images/works/game.jpg",
    url: "https://example.com/game",
    description: "ブラウザで動作するレトロなシューティングゲームです。",
  },
  {
    id: "work-04",
    title: "Corporate Website",
    category: "web",
    tags: ["WordPress", "PHP", "Sass"],
    thumbnail: "/assets/images/works/corp.jpg",
    description:
      "BEM記法を用いた保守性の高いコーポレートサイトのテンプレートです。",
  },
];
