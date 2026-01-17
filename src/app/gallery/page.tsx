"use client";

import { useFiltering } from "@/lib/hooks/useFiltering";
import { TitleAndCount } from "./components/ui/TitleAndCount";
import { UI_PARTS } from "@/data/gallery/ui-parts";
import { CategoryList } from "./components/filter/CategoryList";
import { GalleryLayout } from "./components/layout/GalleryLayout";
import { ItemList } from "./components/list/ItemList";
import { TagFilters } from "./components/filter/TagFilters";
// import { SearchBox } from "./components/filter/SearchBox";
// import { Pagination } from "./components/list/Pagination";

export default function GalleryPage() {
  const filtering = useFiltering(UI_PARTS);

  // useFilteringから必要な値を展開
  const {
    selectedCategory,
    selectedTags,
    searchQuery,
    filteredItems,
    noResultsMessage,
    setSelectedCategory,
    setSelectedTags,
    setSearchQuery,
    // currentPage, totalPages, setCurrentPage (ページネーション実装時に使用)
  } = filtering;

  return (
    <GalleryLayout filtering={filtering}>
      <div className="space-y-8">
        {/* 1. ヘッダーエリア：現在のヒット件数と状況メッセージ */}
        <TitleAndCount
          count={filteredItems.length}
          message={noResultsMessage}
        />

        {/* 2. 検索・フィルタリングセクション */}
        <div className="space-y-6">
          {/* 自由ワード検索 */}
          {/* <SearchBox value={searchQuery} onChange={setSearchQuery} /> */}

          {/* 大カテゴリ選択 */}
          <CategoryList
            selected={selectedCategory}
            onChange={setSelectedCategory}
          />

          {/* タグフィルタセクション（司令塔である TagGroup を並べる） */}
          <TagFilters selectedTags={selectedTags} onChange={setSelectedTags} />
        </div>

        {/* 3. メインコンテンツエリア */}
        {filteredItems.length === 0 ? (
          /* ヒットなしの場合の空状態表示 */
          <div className="py-24 text-center bg-white border-2 border-dashed border-neutral-100 rounded-3xl">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-neutral-600 font-semibold">{noResultsMessage}</p>
            <p className="text-sm text-neutral-400 mt-2">
              キーワードを変えるか、フィルターをリセットしてみてください。
            </p>
          </div>
        ) : (
          /* ヒットありの場合のリスト表示 */
          <div className="space-y-10">
            <ItemList />

            {/* ページネーション（実装時にコメント解除） */}
            {/* {filtering.totalPages > 1 && (
              <div className="pt-8 border-t border-neutral-100">
                <Pagination 
                  current={filtering.currentPage} 
                  total={filtering.totalPages} 
                  onChange={filtering.setCurrentPage} 
                />
              </div>
            )} 
            */}
          </div>
        )}
      </div>
    </GalleryLayout>
  );
}
