"use client";

import { Filtering } from "@/types/gallery/filtering";
import { CategoryList } from "../filter/CategoryList";
import { TagFilters } from "../filter/TagFilters";
import { SearchBox } from "../filter/SearchBox";

type Props = {
  filtering: Filtering;
  isOpen: boolean;
  onClose: () => void;
};

export function GalleryDrawerMenu({ filtering, isOpen, onClose }: Props) {
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
    <>
      {/* オーバーレイ */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* ドロワー本体 */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* --- 固定エリア (追従項目) --- */}
        <div className="flex-none p-5 space-y-5 border-b border-neutral-100 shadow-sm z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-neutral-800">検索パネル</h2>
              <span className="text-[10px] text-neutral-400 font-bold tabular-nums">
                ヒット：{filteredItems.length} 件
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-50 text-neutral-400 text-2xl hover:bg-neutral-100 transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* 検索入力欄セクション */}
          <section aria-labelledby="sp-heading-keyword" className="space-y-2">
            <h3
              id="sp-heading-keyword"
              className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-1"
            >
              Keyword
            </h3>
            <SearchBox value={searchQuery} onChange={setSearchQuery} />
          </section>

          {/* リセットボタン */}
          <button
            onClick={clearFilters}
            className="w-full py-2.5 bg-neutral-100 text-neutral-600 rounded-xl text-xs font-bold active:bg-neutral-200 transition-colors"
          >
            フィルターをリセット
          </button>
        </div>

        {/* --- スクロールエリア (選択肢) --- */}
        <div className="flex-1 overflow-y-auto p-5 space-y-10 pb-20 custom-scrollbar">
          {/* カテゴリセクション */}
          <section aria-labelledby="sp-heading-category" className="space-y-3">
            <h3
              id="sp-heading-category"
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
          <section aria-labelledby="sp-heading-tags" className="space-y-3">
            <h3
              id="sp-heading-tags"
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
      </div>
    </>
  );
}
