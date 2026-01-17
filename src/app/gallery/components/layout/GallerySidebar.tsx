// 2.
// UI検索ナビゲーション左固定サイドバー

"use client";

import { Filtering } from "@/types/gallery/filtering";
import { CategoryList } from "../filter/CategoryList";
import { TagFilters } from "../filter/TagFilters";
import { SearchBox } from "../filter/SearchBox";

type Props = {
  // 親(page.tsx)から渡されるフィルタリングの共通状態
  filtering: Filtering;
};

export function GallerySidebar({ filtering }: Props) {
  // Props経由で共通の関数と状態を取り出す
  const {
    selectedCategory,
    selectedTags,
    searchQuery,
    setSelectedCategory,
    setSelectedTags,
    setSearchQuery,
  } = filtering;

  return (
    <aside className="w-full h-full flex flex-col bg-white border-r border-neutral-100 overflow-y-auto">
      {/* サイドバーヘッダー */}
      <div className="p-6 border-b border-neutral-50">
        <h2 className="text-xl font-bold tracking-tight text-neutral-800">
          Filter
        </h2>
        <p className="text-xs text-neutral-400 mt-1">条件を絞り込んで探す</p>
      </div>

      <div className="p-6 space-y-8">
        {/* 1. キーワード検索（サイドバーにあると便利） */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-1">
            Search
          </h3>
          <SearchBox value={searchQuery} onChange={setSearchQuery} />
        </section>

        {/* 2. カテゴリ選択 */}
        <section className="space-y-3">
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest px-1">
            Category
          </h3>
          <CategoryList
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />
        </section>

        {/* 3. タグフィルタ（今日作成した TagFilters を再利用） */}
        <section className="bg-neutral-50 p-4 rounded-2xl">
          <TagFilters selectedTags={selectedTags} onChange={setSelectedTags} />
        </section>
      </div>

      {/* フッター（件数表示などが必要な場合） */}
      <div className="mt-auto p-6 bg-neutral-50/50 border-t border-neutral-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-neutral-500 font-medium">
            Hits: {filtering.filteredItems.length} items
          </span>
        </div>
      </div>
    </aside>
  );
}
