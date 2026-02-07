// src / app / works / components / WorkSearchPanel.tsx;
"use client";

import React from "react";
import { Search, RotateCcw, Tag } from "lucide-react";
import { WorkFilterCategory } from "@/types/work";

type Props = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: WorkFilterCategory;
  setSelectedCategory: (cat: WorkFilterCategory) => void;
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  availableTags: string[];
};

export const WorkSearchPanel = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTags,
  toggleTag,
  clearFilters,
  availableTags,
}: Props) => {
  const categories: { label: string; value: WorkFilterCategory }[] = [
    { label: "All", value: "all" },
    { label: "Web制作", value: "web" },
    { label: "WordPress", value: "wordpress" },
    { label: "アプリケーション", value: "app" },
    { label: "ゲーム", value: "game" },
  ];

  return (
    <div className="space-y-8 mb-12">
      {/* 1. カテゴリ選択（中央寄せで整列） */}
      <div className="flex flex-wrap justify-center md:justify-start gap-3">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-6 py-2.5 rounded-full text-xs font-black transition-all border ${
              selectedCategory === cat.value
                ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-100"
                : "bg-white text-slate-500 border-slate-200 hover:border-blue-400"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 2. 検索とタグ（モバイルでは縦並び、PCでは横並び） */}
      <div className="flex flex-col lg:flex-row gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
        <div className="relative w-full lg:w-80 shrink-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="キーワードで絞り込む..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Tag size={12} /> Filter by Technology
          </div>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
                  selectedTags.includes(tag)
                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                    : "bg-white text-slate-400 border-slate-200 hover:text-slate-600 hover:border-slate-300"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:border-l lg:pl-6 flex items-center">
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-4 py-2 text-[10px] font-black text-blue-600 hover:bg-blue-50 rounded-xl transition-all uppercase tracking-widest"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};