// UI検索ナビゲーション左固定サイドバー

"use client";

import { Filtering } from "@/types/gallery/filtering";
import { CategoryList } from "../filter/CategoryList";
import { TagFilters } from "../filter/TagFilters";
import { SearchBox } from "../filter/SearchBox";

export function GallerySidebar({ filtering }: { filtering: Filtering }) {
  return (
    // h-full で親の 100vh を引き継ぐ
    <div className="flex flex-col h-full bg-white">
      {/* 1. 固定ヘッダー: sticky ではなく flex の一部として固定 */}
      <div className="flex-none border-b border-neutral-100">
        <div className="p-6 pb-2">
          <h2 className="text-xl font-bold tracking-tight text-neutral-800">
            検索パネル
          </h2>
          <span className="text-xs text-neutral-500 font-medium">
            検索結果：{filtering.filteredItems.length} 件
          </span>
          <button
            onClick={filtering.clearFilters}
            className="ml-2 mt-6 px-6 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-full text-xs font-bold transition-colors"
          >
            フィルターをリセット
          </button>
        </div>
        <section className="p-6 pt-4">
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-1 mb-3">
            Search
          </h3>
          <SearchBox
            value={filtering.searchQuery}
            onChange={filtering.setSearchQuery}
          />
        </section>
      </div>

      {/* 2. スクロール可能エリア: flex-1 で残りの高さをすべて埋め、overflow-y-auto にする */}
      <div className="custom-scrollbar flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-1">
            Category
          </h3>
          <CategoryList
            selected={filtering.selectedCategory}
            onChange={filtering.setSelectedCategory}
            counts={filtering.categoryCounts}
          />
        </section>

        <section className="bg-neutral-50 p-4 rounded-2xl">
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-1">
            Tags
          </h3>
          <TagFilters
            selectedTags={filtering.selectedTags}
            onChange={filtering.setSelectedTags}
          />
        </section>
      </div>
    </div>
  );
}
