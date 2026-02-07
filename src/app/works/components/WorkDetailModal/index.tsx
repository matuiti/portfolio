"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Work, WorkFilterCategory } from "@/types/work";
import { useWorkStore } from "@/store/useWorkStore";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
} from "lucide-react";
import Image from "next/image";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  work: Work;
  allFilteredWorks: Work[]; // エラー解消：Propsの型定義に追加
  onNavigate: (work: Work) => void;
};

export const WorkDetailModal = ({
  isOpen,
  onClose,
  work,
  allFilteredWorks,
  onNavigate,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const selectOnlyTag = useWorkStore((state) => state.selectOnlyTag);
  const selectOnlyCategory = useWorkStore((state) => state.selectOnlyCategory);

  if (!isOpen) return null;

  const isWorksPage = pathname.startsWith("/works");

  // ナビゲーション用ロジック
  const currentIndex = allFilteredWorks.findIndex((w) => w.id === work.id);
  const prevWork = allFilteredWorks[currentIndex - 1];
  const nextWork = allFilteredWorks[currentIndex + 1];

  // カテゴリクリック時の挙動（WorkCardと同じロジック）
  const handleCategoryClick = (cat: string) => {
    onClose(); // モーダルを閉じる
    if (isWorksPage) {
      selectOnlyCategory(cat as WorkFilterCategory);
    } else {
      router.push(`/works?category=${encodeURIComponent(cat)}`);
    }
  };

  // タグクリック時の挙動
  const handleTagClick = (tag: string) => {
    onClose(); // モーダルを閉じる
    if (isWorksPage) {
      selectOnlyTag(tag);
    } else {
      router.push(`/works?tags=${encodeURIComponent(tag)}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* 背景オーバーレイ */}
      <div
        className="absolute inset-0 bg-slate-900/90 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* モーダル本体 */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
        {/* ヘッダー/閉じるボタン */}
        <div className="absolute top-6 right-6 z-10">
          <button
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex flex-col lg:flex-row">
            {/* 左側：ビジュアルエリア */}
            <div className="lg:w-3/5 bg-slate-100 aspect-video relative">
              <Image
                src={work.thumbnail}
                alt={work.title}
                fill
                className="object-cover"
              />
            </div>

            {/* 右側：詳細情報エリア */}
            <div className="lg:w-2/5 p-8 md:p-12 flex flex-col">
              <div className="mb-6">
                {work.category.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className="text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4 hover:underline cursor-pointer"
                  >
                    {cat}
                  </button>
                ))}
                <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                  {work.title}
                </h2>
              </div>

              <div className="space-y-6 flex-1 text-slate-600 text-sm leading-relaxed">
                <p>{work.description}</p>

                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className="px-3 py-1.5 bg-slate-100 rounded-lg font-bold text-slate-500 hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* 外部リンク */}
              <div className="pt-8 mt-8 border-t border-slate-100 flex gap-4">
                {work.url && (
                  <a
                    href={work.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:opacity-70"
                  >
                    <ExternalLink className="w-4 h-4" /> Visit Site
                  </a>
                )}
                {work.github && (
                  <a
                    href={work.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 text-sm font-bold text-slate-900 hover:opacity-70"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ナビゲーションフッター */}
        <div className="bg-slate-50 px-8 py-4 flex items-center justify-between border-t border-slate-100">
          <button
            onClick={() => prevWork && onNavigate(prevWork)}
            disabled={!prevWork}
            className="flex items-center gap-2 text-sm font-bold text-slate-400 disabled:opacity-20 hover:text-slate-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" /> PREV
          </button>
          <span className="text-[10px] font-black text-slate-300 tracking-widest uppercase">
            {currentIndex + 1} / {allFilteredWorks.length}
          </span>
          <button
            onClick={() => nextWork && onNavigate(nextWork)}
            disabled={!nextWork}
            className="flex items-center gap-2 text-sm font-bold text-slate-400 disabled:opacity-20 hover:text-slate-900 transition-colors"
          >
            NEXT <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
