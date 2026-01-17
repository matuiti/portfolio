"use client";

import { useFiltering } from "@/lib/hooks/useFiltering";
import { TitleAndCount } from "./components/ui/TitleAndCount";
import { UI_PARTS } from "@/data/gallery/ui-parts";
import { GalleryLayout } from "./components/layout/GalleryLayout";
import { ItemList } from "./components/list/ItemList";
import { useURLSync } from "@/lib/hooks/useURLSync";
import { Pagination } from "./components/filter/Pagination"; // パスは適宜調整してください

export default function GalleryPage() {
  const filtering = useFiltering(UI_PARTS);

  // useFilteringから必要な値をすべて展開
  const {
    filteredItems, // 全体のヒット件数用
    paginatedItems, // 現在のページに表示する分
    noResultsMessage,
    currentPage,
    totalPages,
    setCurrentPage,
  } = filtering;

  // URL同期を開始（category, tags, q, page を監視）
  useURLSync(filtering);

  return (
    <GalleryLayout filtering={filtering}>
      <div className="space-y-8">
        {/* 1. ヘッダーエリア：全体のヒット件数を表示 */}
        <TitleAndCount count={filteredItems.length} />

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
            {/* ページ分割されたアイテムのみをリストに渡す */}
            <ItemList items={paginatedItems} />

            {/* 2ページ以上ある場合のみページネーションを表示 */}
            {totalPages > 1 && (
              <div className="pt-8 border-t border-neutral-100">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </GalleryLayout>
  );
}
