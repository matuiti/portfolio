// src / app / works / components / WorkSearchPanel.tsx;
"use client";

import React from "react";
import { Search, RotateCcw } from "lucide-react";
import { WorkFilterCategory } from "@/types/work";
import { useWorkStore } from "@/store/useWorkStore";
import { ALL_WORKS } from "@/data/works";

export const WorkSearchPanel = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    toggleTag,
    clearFilters,
  } = useWorkStore();

  // 全作品から利用可能なタグを抽出（ストアに持たせてもOK）
  const availableTags = Array.from(
    new Set(ALL_WORKS.flatMap((w) => w.tags)),
  ).sort();

  const categories: { label: string; value: WorkFilterCategory }[] = [
    { label: "All", value: "all" },
    { label: "Web制作", value: "web" },
    { label: "WordPress", value: "wordpress" },
    { label: "アプリケーション", value: "app" },
    { label: "ゲーム", value: "game" },
  ];

  return (
    <div className="space-y-8 bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
      <div className="flex flex-wrap justify-center gap-3">
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

      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="キーワードで絞り込む..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
          />
        </div>
        <button
          onClick={clearFilters}
          className="flex items-center gap-2 px-6 py-3 text-[10px] font-black text-blue-600 hover:bg-blue-50 rounded-xl transition-all uppercase tracking-widest"
        >
          <RotateCcw className="w-3 h-3" /> Reset
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border ${
              selectedTags.includes(tag)
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-400 border-slate-200"
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
};