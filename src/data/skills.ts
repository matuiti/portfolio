// src/data/skills.ts
import { SkillGroup } from "@/types/skill";

export const ALL_SKILLS: SkillGroup[] = [
  {
    id: "frontend",
    title: "Front-end Engineering",
    icon: "Code2",
    categories: [
      {
        label: "Core Libraries",
        items: [
          {
            name: "Next.js",
            level: 4,
            label: "実務レベル",
            experience: "App Router / Page Router",
            description:
              "Server Componentsを用いた高度な最適化と、ISR/SSGを活用した設計が可能。",
            links: [
              {
                label: "Related Works",
                url: "/works?category=All&q=Next.js",
                type: "project",
              },
              {
                label: "Internal Repo",
                url: "https://github.com/your-id/next-boilerplate",
                type: "github",
              },
            ],
          },
          {
            name: "React",
            level: 5,
            label: "精通",
            experience: "実務 4年",
            description:
              "カスタムフックによるロジックの分離、パフォーマンスを意識したコンポーネント設計。",
            links: [
              {
                label: "Related Works",
                url: "/works?category=All&q=React",
                type: "project",
              },
            ],
          },
          {
            name: "TypeScript",
            level: 4,
            label: "実務レベル",
            experience: "全案件採用",
            description:
              "Genericsを用いた型安全なユーティリティ開発や、スキーマ駆動開発の経験。",
            links: [
              {
                label: "Type Logic Sample",
                url: "https://github.com/your-id/ts-logic",
                type: "github",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "cms",
    title: "CMS & Backend",
    icon: "Server",
    categories: [
      {
        label: "Platform",
        items: [
          {
            name: "WordPress",
            level: 5,
            label: "精通",
            experience: "独自テーマ開発多数",
            description:
              "REST API連携、カスタムフィールドによる高度な管理画面カスタマイズに対応。",
            links: [
              {
                label: "WP Portfolio",
                url: "/works?category=WordPress",
                type: "project",
              },
            ],
          },
        ],
      },
    ],
  },
];
