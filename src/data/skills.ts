// src/data/skills.ts
import { SkillGroup } from "@/types/skill";

export const ALL_SKILLS: SkillGroup[] = [
  {
    title: "Front-end Engineering",
    items: [
      {
        name: "Next.js",
        label: "実務レベル",
        description:
          "Server Componentsを用いた高度な最適化と、ISR/SSGを活用した設計が可能。Server Componentsを用いた高度な最適化と、ISR/SSGを活用した設計が可能。",
        links: [
          {
            url: "/works?category=all&q=Next.js",
            type: "project",
          },
          {
            url: "https://github.com/your-id/next-boilerplate",
            type: "github",
          },
        ],
      },
      {
        name: "React",
        label: "精通",
        description:
          "カスタムフックによるロジックの分離、パフォーマンスを意識したコンポーネント設計。",
        links: [
          {
            url: "/works?category=all&q=React",
            type: "project",
          },
        ],
      },
      {
        name: "TypeScript",
        label: "基礎",
        description:
          "Genericsを用いた型安全なユーティリティ開発や、スキーマ駆動開発の経験。",
        links: [
          {
            url: "https://github.com/your-id/ts-logic",
            type: "github",
          },
        ],
      },
    ],
  },
  {
    title: "CMS & Backend",
    items: [
      {
        name: "WordPress",
        label: "精通",
        description:
          "REST API連携、カスタムフィールドによる高度な管理画面カスタマイズに対応。",
        links: [
          {
            url: "/works?category=WordPress",
            type: "project",
          },
        ],
      },
    ],
  },
  {
    title: "AAA",
    items: [
      {
        name: "WordPress",
        label: "精通",
        description:
          "REST API連携、カスタムフィールドによる高度な管理画面カスタマイズに対応。",
        links: [
          {
            url: "/works?category=WordPress",
            type: "project",
          },
        ],
      },
    ],
  },
  {
    title: "BBB",
    items: [
      {
        name: "WordPress",
        label: "精通",
        description:
          "REST API連携、カスタムフィールドによる高度な管理画面カスタマイズに対応。",
        links: [
          {
            url: "/works?category=WordPress",
            type: "project",
          },
        ],
      },
    ],
  },
];
