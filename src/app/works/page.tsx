"use client";

import React, { useState, useMemo } from "react";
import {
  Zap,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Github,
  X,
  Info,
  Trophy,
} from "lucide-react";

// --- 1. 型定義 (Types) ---
type WorkCategory = "Web制作" | "WordPress" | "Next.js" | "スポット修正";
type DisclosureLevel = "Full" | "NDA";

type QualityStandard = {
  label: string;
  isValid: boolean;
};

type Work = {
  id: string;
  displayTitle: string;
  category: WorkCategory[];
  disclosureLevel: DisclosureLevel;
  duration: string;
  isSpeedyWork: boolean;
  isLongTerm: boolean; // 中長期プロジェクト用フラグ
  role: string;
  technologies: string[];
  summary: string;
  background: string;
  solution: string;
  professionalView: string;
  quality: QualityStandard[];
  url?: string;
  github?: string;
};

// --- 2. サンプルデータ (Mock Data) ---
// アイテムがたくさん並んだ見た目を確認するため、データを増やしています
const WORKS_DATA: Work[] = [
  {
    id: "1",
    displayTitle: "大手ポータルサイト 表示速度改善",
    category: ["スポット修正", "Next.js"],
    disclosureLevel: "NDA",
    duration: "即日",
    isSpeedyWork: true,
    isLongTerm: false,
    role: "パフォーマンスチューニング",
    technologies: ["React", "Next.js", "Lighthouse"],
    summary: "ボトルネックを特定し、Lighthouseスコアを20pt改善しました。",
    background:
      "特定のページで読み込みが5秒以上かかり、離脱率が悪化していました。",
    solution:
      "画像最適化とコード分割を徹底し、クリティカルレンダリングパスを最適化。",
    professionalView:
      "短期修正でも、将来の保守性を損なわない型安全性を徹底しました。",
    quality: [
      { label: "実機検証済", isValid: true },
      { label: "W3C準拠", isValid: true },
      { label: "アクセシビリティ", isValid: true },
    ],
  },
  {
    id: "2",
    displayTitle: "不動産プラットフォーム 基盤構築",
    category: ["Web制作", "Next.js"],
    disclosureLevel: "Full",
    duration: "4ヶ月",
    isSpeedyWork: false,
    isLongTerm: true,
    role: "リードエンジニア",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    summary:
      "大規模な物件検索システムのフロントエンド基盤を設計・実装しました。",
    background:
      "レガシーなシステムからの脱却と、UXの劇的な向上を目的としたリニューアルプロジェクト。",
    solution: "Atomic Designを採用し、再利用性の高いコンポーネント設計を導入。",
    professionalView:
      "半年以上の長期運用を見据え、徹底したドキュメント化とテストコード導入を行いました。",
    quality: [
      { label: "実機検証済", isValid: true },
      { label: "アクセシビリティ", isValid: true },
      { label: "コンポーネント設計", isValid: true },
    ],
    github: "https://github.com/example",
  },
  {
    id: "3",
    displayTitle: "老舗メーカー 企業サイト制作",
    category: ["Web制作", "WordPress"],
    disclosureLevel: "Full",
    duration: "1.5ヶ月",
    isSpeedyWork: false,
    isLongTerm: true,
    role: "デザイン・実装",
    technologies: ["WordPress", "PHP", "Sass"],
    summary:
      "伝統を重んじるデザインと、最新のWeb標準を両立させたコーポレートサイト。",
    background:
      "古いWebサイトからの刷新。自社での更新性を強く希望されていました。",
    solution:
      "カスタムブロックを開発し、HTMLの知識がなくとも高度なレイアウト更新を可能に。",
    professionalView:
      "1px単位のデザイン再現に加え、全ページでW3Cバリデーションを通過させました。",
    quality: [
      { label: "実機検証済", isValid: true },
      { label: "W3C準拠", isValid: true },
      { label: "更新マニュアル作成", isValid: true },
    ],
    url: "https://example.com",
  },
  {
    id: "4",
    displayTitle: "決済フォーム バグ修正",
    category: ["スポット修正"],
    disclosureLevel: "NDA",
    duration: "3時間",
    isSpeedyWork: true,
    isLongTerm: false,
    role: "デバッグ・修正",
    technologies: ["JavaScript"],
    summary: "iOS/Safari環境下でのみ発生する決済不備を特定・解消。",
    background: "リリース直後に一部環境で決済が完了しない緊急事態が発生。",
    solution:
      "ブラウザ固有のイベント挙動の差を特定。polyfillとコード調整で対応。",
    professionalView:
      "緊急時こそ冷静な実機検証を。4種のOS・ブラウザで確実な動作を確認しました。",
    quality: [
      { label: "実機検証済", isValid: true },
      { label: "クロスブラウザ対応", isValid: true },
    ],
  },
  {
    id: "5",
    displayTitle: "キャンペーンLP制作",
    category: ["Web制作"],
    disclosureLevel: "Full",
    duration: "1週間",
    isSpeedyWork: true,
    isLongTerm: false,
    role: "コーディング",
    technologies: ["HTML", "Sass", "GSAP"],
    summary: "アニメーションを多用した、訴求力の高いランディングページ。",
    background:
      "新商品発表に合わせた、短納期かつ高品質な実装が求められました。",
    solution: "GSAPによる滑らかなスクロール演出と、軽量な画像形式の採用。",
    professionalView:
      "納期優先でもアクセシビリティを犠牲にせず、適切なセマンティックマークアップを維持しました。",
    quality: [
      { label: "実機検証済", isValid: true },
      { label: "W3C準拠", isValid: true },
      { label: "アニメーション実装", isValid: true },
    ],
    url: "https://example.com/lp",
  },
];

// カテゴリ一覧
const CATEGORIES: (WorkCategory | "All")[] = [
  "All",
  "Web制作",
  "WordPress",
  "Next.js",
  "スポット修正",
];

export default function WorksPage() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [filter, setFilter] = useState<WorkCategory | "All">("All");

  // フィルタリング処理
  const filteredWorks = useMemo(() => {
    if (filter === "All") return WORKS_DATA;
    return WORKS_DATA.filter((work) => work.category.includes(filter));
  }, [filter]);

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black mb-6 tracking-tighter text-slate-900">
            PORTFOLIO
          </h1>

          {/* フィルターUI */}
          <div className="flex flex-wrap gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all border ${
                  filter === cat
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200"
                    : "bg-white text-slate-500 border-slate-200 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* 実績一覧グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredWorks.map((work) => (
            <div
              key={work.id}
              onClick={() => setSelectedWork(work)}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-slate-100 flex flex-col"
            >
              {/* サムネイル */}
              <div className="aspect-video bg-slate-100 relative flex items-center justify-center text-slate-300">
                {work.disclosureLevel === "NDA" ? (
                  <ShieldCheck size={48} strokeWidth={1} />
                ) : (
                  <span className="font-black italic text-xl uppercase opacity-20 tracking-tighter text-slate-900">
                    Project View
                  </span>
                )}

                {/* バッジ表示 */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {work.isSpeedyWork && (
                    <div className="bg-yellow-400 text-yellow-900 text-[9px] font-black px-2 py-1 rounded flex items-center shadow-sm uppercase tracking-wider">
                      <Zap size={10} className="mr-1 fill-current" /> Speedy
                    </div>
                  )}
                  {work.isLongTerm && (
                    <div className="bg-emerald-500 text-white text-[9px] font-black px-2 py-1 rounded flex items-center shadow-sm uppercase tracking-wider">
                      <Trophy size={10} className="mr-1 fill-current" />{" "}
                      Accomplished
                    </div>
                  )}
                </div>
              </div>

              {/* カード情報 */}
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {work.category.map((cat) => (
                    <span
                      key={cat}
                      className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold uppercase tracking-wider"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-bold mb-2 group-hover:text-blue-600 transition-colors leading-tight text-slate-800">
                  {work.displayTitle}
                </h2>
                <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">
                  {work.summary}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                  <span>{work.role}</span>
                  <span>{work.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 詳細モーダル */}
      {selectedWork && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full my-auto shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10 text-slate-400"
            >
              <X size={24} />
            </button>

            <div className="p-8 md:p-12 text-left">
              <header className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                    {selectedWork.category[0]}
                  </span>
                  {selectedWork.disclosureLevel === "NDA" && (
                    <span className="text-slate-400 text-[10px] font-bold flex items-center border border-slate-200 px-3 py-1 rounded-full">
                      <ShieldCheck size={12} className="mr-1" /> NDA
                    </span>
                  )}
                </div>
                <h2 className="text-4xl font-black mb-6 text-slate-900 tracking-tight leading-tight">
                  {selectedWork.displayTitle}
                </h2>
                <div className="grid grid-cols-2 gap-4 text-sm bg-slate-50 p-5 rounded-2xl">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                      Role
                    </p>
                    <p className="font-bold">{selectedWork.role}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                      Duration
                    </p>
                    <p className="font-bold">{selectedWork.duration}</p>
                  </div>
                </div>
              </header>

              <div className="space-y-10">
                <section>
                  <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-4">
                    Background
                  </h3>
                  <p className="text-slate-700 leading-relaxed">
                    {selectedWork.background}
                  </p>
                </section>

                <section>
                  <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-4">
                    Solution
                  </h3>
                  <p className="text-slate-700 leading-relaxed mb-4">
                    {selectedWork.solution}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedWork.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-white border border-slate-200 text-slate-500 px-3 py-1 rounded text-[10px] font-bold uppercase"
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Info size={80} />
                  </div>
                  <h3 className="text-blue-400 text-xs font-black uppercase tracking-widest mb-3">
                    Professional Commitment
                  </h3>
                  <p className="text-slate-200 text-base leading-relaxed italic font-medium relative z-10">
                    「{selectedWork.professionalView}」
                  </p>
                </section>

                <section>
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                    My Quality Standard
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {selectedWork.quality.map((q, i) => (
                      <div
                        key={i}
                        className="flex items-center text-xs font-bold text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100"
                      >
                        <CheckCircle2
                          size={16}
                          className="mr-2 text-emerald-500 fill-emerald-50"
                        />{" "}
                        {q.label}
                      </div>
                    ))}
                  </div>
                </section>

                <footer className="pt-10 flex flex-wrap gap-4">
                  {selectedWork.url && (
                    <a
                      href={selectedWork.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all text-sm shadow-xl shadow-blue-100"
                    >
                      <Globe size={18} className="mr-2" /> VISIT SITE
                    </a>
                  )}
                  {selectedWork.github && (
                    <a
                      href={selectedWork.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center bg-slate-100 text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-slate-200 transition-all text-sm"
                    >
                      <Github size={18} className="mr-2" /> VIEW SOURCE
                    </a>
                  )}
                </footer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
