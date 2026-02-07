"use client";

import { CategoryList } from "../filter/CategoryList";
import { TagFilters } from "../filter/TagFilters";
import { SearchBox } from "../filter/SearchBox";
import { Filtering } from "@/gallery/types/filtering";

export function GallerySidebar({ filtering }: { filtering: Filtering }) {
  const {
    selectedCategory,
    selectedTags,
    searchQuery,
    categoryCounts,
    filteredItems,
    setSelectedCategory,
    setSelectedTags,
    setSearchQuery,
    clearFilters,
  } = filtering;

  return (
    <nav
      className="flex flex-col h-full bg-white"
      aria-labelledby="sidebar-headline"
    >
      {/* --- 固定エリア (追従項目) --- */}
      <div className="flex-none p-6 space-y-5 border-b border-neutral-100 shadow-sm z-10">
        <div className="flex items-center justify-between">
          <h2
            id="sidebar-headline"
            className="text-xl font-bold text-neutral-800 tracking-tight"
          >
            検索パネル
          </h2>
          <span className="px-2 py-1 bg-neutral-900 text-white text-[10px] font-bold rounded tabular-nums">
            {filteredItems.length} 件
          </span>
        </div>

        {/* 検索入力欄セクション */}
        <section aria-labelledby="heading-keyword" className="space-y-2">
          <h3
            id="heading-keyword"
            className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-1"
          >
            Keyword
          </h3>
          <SearchBox value={searchQuery} onChange={setSearchQuery} />
        </section>

        {/* リセットボタン */}
        <button
          onClick={clearFilters}
          className="w-full py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-xl text-xs font-bold transition-all active:scale-[0.98]"
        >
          フィルターをリセット
        </button>
      </div>

      {/* --- スクロールエリア (選択肢) --- */}
      <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
        {/* カテゴリセクション */}
        <section aria-labelledby="heading-category" className="space-y-3">
          <h3
            id="heading-category"
            className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-1"
          >
            Category
          </h3>
          <CategoryList
            selected={selectedCategory}
            onChange={setSelectedCategory}
            counts={categoryCounts}
          />
        </section>

        {/* タグセクション */}
        <section aria-labelledby="heading-tags" className="space-y-3">
          <h3
            id="heading-tags"
            className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-1"
          >
            Tags
          </h3>
          <div className="bg-neutral-50 p-4 rounded-2xl">
            <TagFilters
              selectedTags={selectedTags}
              onChange={setSelectedTags}
            />
          </div>
        </section>
      </div>
    </nav>
  );
}
