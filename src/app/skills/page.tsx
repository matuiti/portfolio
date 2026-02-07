"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Terminal,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Github,
  FileCode,
  Layout,
  Code2,
  Server,
  Settings,
} from "lucide-react";

// --- 型定義 ---
type SkillLevelValue = 1 | 2 | 3 | 4 | 5;

type SkillLink = {
  label: string;
  url: string;
  type: "project" | "github" | "cert";
};

type SkillItem = {
  name: string;
  level: SkillLevelValue;
  label: string;
  experience: string;
  description: string;
  links?: SkillLink[];
};

type SkillGroup = {
  title: string;
  id: string;
  icon: React.ReactNode;
  categories: {
    label: string;
    items: SkillItem[];
  }[];
};

// --- 大規模データ定義 ---
const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "01 / Web Design & Markup",
    id: "markup",
    icon: <Layout size={16} />,
    categories: [
      {
        label: "設計思想・コーディング",
        items: [
          {
            name: "HTML5 / CSS3",
            level: 5,
            label: "精通",
            experience: "実務 5年",
            description:
              "セマンティック・アクセシビリティ対応。最新のCSSプロパティを用いたアニメーション実装。",
            links: [
              { label: "Site_A", url: "#", type: "project" },
              { label: "Code", url: "#", type: "github" },
            ],
          },
          {
            name: "Sass (SCSS) / FLOCSS",
            level: 5,
            label: "精通",
            experience: "全案件採用",
            description:
              "大規模サイトでもメンテナンス性を維持する、厳格なディレクトリ設計とモジュール管理。",
            links: [{ label: "Structure_Sample", url: "#", type: "github" }],
          },
          {
            name: "Responsive Design",
            level: 5,
            label: "精通",
            experience: "実務 5年",
            description:
              "350pxから4Kまで、Fluid Designを用いた完璧な表示最適化。",
            links: [{ label: "Responsive_Test", url: "#", type: "project" }],
          },
        ],
      },
    ],
  },
  {
    title: "02 / Frontend Engineering",
    id: "frontend",
    icon: <Code2 size={16} />,
    categories: [
      {
        label: "モダンフレームワーク",
        items: [
          {
            name: "TypeScript",
            level: 4,
            label: "実務レベル",
            experience: "実務 2年",
            description:
              "型安全な設計を徹底。GenericsやUtility Typesを駆使した再利用性の高いコード。",
            links: [{ label: "Type_Definition", url: "#", type: "github" }],
          },
          {
            name: "React / Next.js",
            level: 4,
            label: "実務レベル",
            experience: "App Router",
            description:
              "Server Componentsを用いた高速レンダリングと、最適化された状態管理の実装。",
            links: [
              { label: "Demo_App", url: "#", type: "project" },
              { label: "Repo", url: "#", type: "github" },
            ],
          },
          {
            name: "Tailwind CSS",
            level: 5,
            label: "精通",
            experience: "実務 3年",
            description:
              "デザインシステムを損なわない、独自コンフィグによる高速かつ統一感のあるスタイル構築。",
            links: [{ label: "Style_Kit", url: "#", type: "github" }],
          },
        ],
      },
    ],
  },
  {
    title: "03 / CMS & Backend Integration",
    id: "backend",
    icon: <Server size={16} />,
    categories: [
      {
        label: "バックエンド・CMS運用",
        items: [
          {
            name: "WordPress",
            level: 5,
            label: "精通",
            experience: "独自テーマ制作多数",
            description:
              "カスタム投稿、メタボックスの自作、REST API連携によるヘッドレス運用実績。",
            links: [{ label: "WP_Portfolio", url: "#", type: "project" }],
          },
          {
            name: "MicroCMS / Headless",
            level: 4,
            label: "実務レベル",
            experience: "JAMstack",
            description:
              "Next.jsと連携した高速な静的サイト構築。Webhookを用いたプレビュー環境管理。",
            links: [{ label: "Case_Study", url: "#", type: "project" }],
          },
          {
            name: "PHP / SQL",
            level: 3,
            label: "対応可能",
            experience: "実務 3年",
            description:
              "テーマ内での複雑なロジック実装、データベースの基本操作とクエリ最適化。",
          },
        ],
      },
    ],
  },
  {
    title: "04 / Infrastructure & Workflow",
    id: "infra",
    icon: <Settings size={16} />,
    categories: [
      {
        label: "開発環境・ツール",
        items: [
          {
            name: "Git / GitHub",
            level: 5,
            label: "精通",
            experience: "チーム開発常用",
            description:
              "プルリクエストベースの円滑なチーム開発、ブランチ戦略（Git Flow）の策定。",
            links: [{ label: "PR_History", url: "#", type: "github" }],
          },
          {
            name: "Vercel / AWS",
            level: 4,
            label: "実務レベル",
            experience: "デプロイ・運用",
            description:
              "ドメイン設定、SSL化、CI/CDパイプラインの構築、環境変数のセキュアな管理。",
          },
          {
            name: "Figma / XD",
            level: 4,
            label: "実務レベル",
            experience: "デザイン連携",
            description:
              "デザイントークンの抽出、Auto Layoutを意識した正確なコーディング再現。",
          },
        ],
      },
    ],
  },
];

// --- ゲージ表示 ---
const LevelBar = ({
  level,
  label,
}: {
  level: SkillLevelValue;
  label: string;
}) => (
  <div className="flex flex-col gap-1">
    <div className="flex border-l border-slate-900">
      {[1, 2, 3, 4, 5].map((s) => (
        <div
          key={s}
          className={`w-3.5 h-3 md:w-4 md:h-3.5 border-r border-y border-slate-900 ${s <= level ? "bg-slate-900" : "bg-transparent"}`}
        />
      ))}
    </div>
    <span className="text-[9px] font-black text-slate-900 tracking-tighter uppercase">
      {label}
    </span>
  </div>
);

// --- リンクアイコン ---
const LinkIcon = ({ type }: { type: SkillLink["type"] }) => {
  if (type === "github") return <Github size={10} />;
  if (type === "project") return <ExternalLink size={10} />;
  return <FileCode size={10} />;
};

export default function PerfectSpecSheet() {
  const [openGroups, setOpenGroups] = useState<{ [key: string]: boolean }>(
    Object.fromEntries(SKILL_GROUPS.map((g) => [g.id, true])),
  );

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8 md:p-16 lg:p-20 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      <div className="max-w-5xl mx-auto border-[3px] border-slate-900 p-4 sm:p-6 md:p-12 relative bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        {/* 装飾 */}
        <div className="absolute -top-1 -right-1 w-12 h-12 border-t-[6px] border-r-[6px] border-slate-900" />
        <div className="absolute -bottom-1 -left-1 w-12 h-12 border-b-[6px] border-l-[6px] border-slate-900" />

        <header className="mb-16 border-b-[3px] border-slate-900 pb-10">
          <div className="flex items-center gap-2 mb-4 text-slate-400 font-mono">
            <Terminal size={14} />
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase">
              Tech_Stack_Verified_2024
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-black tracking-tighter mb-4 leading-none uppercase">
            Proof of
            <br />
            Capability<span className="text-blue-600">.</span>
          </h1>
          <p className="text-[12px] md:text-[14px] text-slate-600 font-bold leading-relaxed max-w-2xl border-l-4 border-slate-900 pl-5">
            実務における技術的習熟度と、それを証明するエビデンスのカタログ。
            エンジニアリング品質を「透明化」するための仕様書です。
          </p>
        </header>

        <div className="space-y-16">
          {SKILL_GROUPS.map((group) => (
            <section key={group.id}>
              <button
                onClick={() =>
                  setOpenGroups((p) => ({ ...p, [group.id]: !p[group.id] }))
                }
                className="w-full flex items-center justify-between bg-slate-900 text-white px-4 py-2 mb-8 group hover:scale-[1.01] transition-transform"
              >
                <div className="flex items-center gap-3">
                  {group.icon}
                  <h3 className="text-[11px] md:text-[13px] font-black tracking-[0.2em] uppercase">
                    {group.title}
                  </h3>
                </div>
                {openGroups[group.id] ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>

              <div
                className={`transition-all duration-300 ${openGroups[group.id] ? "opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
              >
                {group.categories.map((cat, idx) => (
                  <div key={idx} className="mb-12 last:mb-0">
                    <h4 className="text-[10px] md:text-[11px] font-black text-slate-900 mb-4 tracking-[0.3em] uppercase flex items-center gap-3">
                      <span className="bg-slate-100 px-2 py-0.5 border border-slate-200">
                        {cat.label}
                      </span>
                    </h4>

                    <div className="border border-slate-900 overflow-hidden">
                      {/* デスクトップテーブル */}
                      <table className="hidden md:table w-full border-collapse">
                        <thead className="bg-slate-50 border-b border-slate-900">
                          <tr className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                            <th className="py-2 px-4 border-r border-slate-200 text-left w-52">
                              Technical_Item
                            </th>
                            <th className="py-2 px-4 border-r border-slate-200 text-left w-36">
                              Grade
                            </th>
                            <th className="py-2 px-4 text-left">
                              Description & Evidence
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {cat.items.map((item) => (
                            <tr
                              key={item.name}
                              className="hover:bg-slate-50 transition-colors"
                            >
                              <td className="py-5 px-4 border-r border-slate-100 align-top">
                                <div className="font-bold text-slate-900 text-[13px]">
                                  {item.name}
                                </div>
                                <div className="text-[9px] text-slate-400 font-mono mt-1 uppercase italic">
                                  {item.experience}
                                </div>
                              </td>
                              <td className="py-5 px-4 border-r border-slate-100 align-top">
                                <LevelBar
                                  level={item.level}
                                  label={item.label}
                                />
                              </td>
                              <td className="py-5 px-5 align-top">
                                <p className="text-[12px] text-slate-600 leading-relaxed font-medium mb-4 text-justify">
                                  {item.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {item.links?.map((link, lIdx) => (
                                    <a
                                      key={lIdx}
                                      href={link.url}
                                      className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 text-[9px] font-black text-slate-900 hover:bg-slate-900 hover:text-white transition-all uppercase tracking-tighter"
                                    >
                                      <LinkIcon type={link.type} /> {link.label}
                                    </a>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {/* モバイルカード (350px対応) */}
                      <div className="md:hidden divide-y divide-slate-900">
                        {cat.items.map((item) => (
                          <div
                            key={item.name}
                            className="p-4 space-y-4 bg-white"
                          >
                            <div className="flex justify-between items-start gap-4">
                              <div className="space-y-1">
                                <div className="font-bold text-slate-900 text-[13px]">
                                  {item.name}
                                </div>
                                <div className="text-[9px] text-slate-400 font-mono italic uppercase tracking-tighter">
                                  {item.experience}
                                </div>
                              </div>
                              <LevelBar level={item.level} label={item.label} />
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                              {item.description}
                            </p>
                            {item.links && (
                              <div className="flex flex-wrap gap-2 pt-1">
                                {item.links.map((link, lIdx) => (
                                  <a
                                    key={lIdx}
                                    href={link.url}
                                    className="flex items-center gap-1.5 px-2 py-1.5 border border-slate-900 text-[9px] font-black uppercase tracking-tighter active:bg-slate-900 active:text-white transition-colors"
                                  >
                                    <LinkIcon type={link.type} /> {link.label}
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-20 pt-10 border-t-[3px] border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-blue-600">
              <ShieldCheck size={18} />
              <span className="text-[11px] font-black tracking-widest uppercase">
                Certified_Spec_Inventory
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-400">
              <CheckCircle2 size={16} />
              <span className="text-[11px] font-black tracking-widest uppercase">
                Verified_Link_Active
              </span>
            </div>
          </div>
          <div className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 border border-slate-200">
            Precision_Ref: CODE_V4.2_LINKED
          </div>
        </footer>
      </div>
    </div>
  );
}
