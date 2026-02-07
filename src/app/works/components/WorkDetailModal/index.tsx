"use client";

import React from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Github,
  ExternalLink,
  Calendar,
  User,
} from "lucide-react";
import { Work } from "@/types/work";
import { useWorkModalNavigation } from "../../lib/hooks/useWorkModalNavigation";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  work: Work;
  allFilteredWorks: Work[];
  onNavigate: (work: Work) => void;
};

export const WorkDetailModal = ({
  isOpen,
  onClose,
  work,
  allFilteredWorks,
  onNavigate,
}: Props) => {
  const { currentIndex, totalCount, hasPrev, hasNext, goToPrev, goToNext } =
    useWorkModalNavigation({
      currentWork: work,
      allWorks: allFilteredWorks,
      onNavigate,
      onClose,
      isOpen,
    });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-4xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95 duration-300">
        {/* ヘッダー: ナビゲーション */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-slate-100 rounded-full text-[11px] font-black text-slate-500 tracking-tighter">
              PROJECT {currentIndex + 1} / {totalCount}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* 移動ボタン [cite: 21, 54] */}
            <div className="flex items-center bg-slate-50 rounded-2xl p-1 border border-slate-200">
              <button
                onClick={goToPrev}
                disabled={!hasPrev}
                className="p-2 disabled:opacity-20 hover:bg-white hover:shadow-sm rounded-xl transition-all"
                title="前へ (←)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="w-px h-4 bg-slate-200 mx-1" />
              <button
                onClick={goToNext}
                disabled={!hasNext}
                className="p-2 disabled:opacity-20 hover:bg-white hover:shadow-sm rounded-xl transition-all"
                title="次へ (→)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-all"
              title="閉じる (Esc)"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* メインコンテンツ [cite: 183-185] */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 左側: ビジュアル要素 */}
            <div className="space-y-6">
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-slate-100 shadow-inner bg-slate-50">
                {work.disclosureLevel === "NDA" ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 bg-slate-50 font-black tracking-widest text-xs">
                    NDA_PROTECTED
                  </div>
                ) : (
                  <Image
                    src={work.thumbnail}
                    alt={work.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>

              {/* 外部リンク [cite: 105] */}
              <div className="flex flex-wrap gap-3">
                {work.url && (
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                  >
                    <ExternalLink className="w-4 h-4" /> Visit Live Site
                  </a>
                )}
                {work.github && (
                  <a
                    href={work.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                )}
              </div>
            </div>

            {/* 右側: テキスト情報 [cite: 105, 185] */}
            <div className="space-y-8">
              <div>
                <div className="flex gap-2 mb-3">
                  {work.category.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-black uppercase tracking-widest"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl font-black text-slate-900 leading-tight mb-4">
                  {work.title}
                </h2>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {work.summary}
                </p>
              </div>

              {/* メタデータグリッド [cite: 106, 185] */}
              <div className="grid grid-cols-2 gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400">
                    <User className="w-3.5 h-3.5" />{" "}
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Role
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    {work.role}
                  </p>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar className="w-3.5 h-3.5" />{" "}
                    <span className="text-[10px] font-black uppercase tracking-widest">
                      Duration
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-700">
                    {work.duration}
                  </p>
                </div>
              </div>

              {/* 詳細説明 */}
              <div className="space-y-4">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1 h-3 bg-blue-600 rounded-full" /> Project
                  Overview
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                  {work.description}
                </p>
              </div>

              {/* タグ [cite: 185] */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-2.5 py-1 rounded-lg"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
