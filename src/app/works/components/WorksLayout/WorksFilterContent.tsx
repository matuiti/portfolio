// src/app/works/components/WorksLayout/WorksFilterContent.tsx
"use client";

import { useWorkStore } from "@/store/useWorkStore";
import { ALL_WORKS } from "@/data/works";
import { WorksSearchBox, WorksCategoryList } from "./FilterParts";

export function WorksFilterContent() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    toggleTag,
    clearFilters,
  } = useWorkStore();

  // カテゴリごとの件数計算
  const categoryCounts = {
    all: ALL_WORKS.length,
    web: ALL_WORKS.filter((w) => w.category.includes("web")).length,
    wordpress: ALL_WORKS.filter((w) => w.category.includes("wordpress")).length,
    app: ALL_WORKS.filter((w) => w.category.includes("app")).length,
    game: ALL_WORKS.filter((w) => w.category.includes("game")).length,
  };

  const availableTags = Array.from(
    new Set(ALL_WORKS.flatMap((w) => w.tags)),
  ).sort();

  return (
    <div className="flex flex-col gap-8">
      {/* 検索ボックス */}
      <section>
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
          Keyword
        </h3>
        <WorksSearchBox value={searchQuery} onChange={setSearchQuery} />
        <button
          onClick={clearFilters}
          className="w-full mt-3 py-2 text-[11px] font-bold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
        >
          フィルターをクリア
        </button>
      </section>

      {/* カテゴリ */}
      <section>
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
          Category
        </h3>
        <WorksCategoryList
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          counts={categoryCounts}
        />
      </section>

      {/* タグチップ */}
      <section>
        <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all border ${
                selectedTags.includes(tag)
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-slate-500 border-slate-200 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
