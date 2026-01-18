// src/app/gallery/page.tsx
"use client";

import { useState } from "react";
import { UIPart } from "@/types/gallery/ui-part";
import { UI_PARTS } from "@/data/gallery/ui-parts";
import { useFiltering } from "@/lib/hooks/useFiltering";
import { GalleryLayout } from "./components/layout/GalleryLayout";
import { ItemList } from "./components/list/ItemList";
import { TitleAndCount } from "./components/ui/TitleAndCount";
import { Pagination } from "./components/list/Pagination";
import { PreviewModal } from "./components/modal/PreviewModal";
import { useURLSync } from "@/lib/hooks/useURLSync";
import { CATEGORIES } from "@/data/gallery/categories";

export default function GalleryPage() {
  /**
   * UI_PARTS || [] とすることで、データの読み込みに不備があっても
   * useFiltering 内部の .reduce や .length でクラッシュするのを防ぎます。
   */
  const filtering = useFiltering(UI_PARTS || []);

  const {
    filteredItems,
    paginatedItems,
    noResultsMessage,
    currentPage,
    totalPages,
    setCurrentPage,
  } = filtering;

  const [selectedItem, setSelectedItem] = useState<UIPart | null>(null);

  const handleCloseModal = () => setSelectedItem(null);
  const handleNavigateModal = (item: UIPart) => setSelectedItem(item);

  // page.tsx 内で「表示する文字列」を確定させる
  const displayTitle =
    CATEGORIES.find((c) => c.id === filtering.selectedCategory)?.label ||
    "すべて";
  const totalHitCount = filteredItems?.length || 0;

  useURLSync(filtering);

  return (
    /* GalleryLayout に filtering オブジェクトを渡すことで、
       サイドバーの CategoryNav 側でも counts や setSelectedCategory が利用可能になります。
    */
    <GalleryLayout filtering={filtering}>
      <div className="space-y-8">
        {/* ヒット件数の表示 */}
        <TitleAndCount title={displayTitle} count={totalHitCount} />

        {totalHitCount === 0 ? (
          /* 検索結果がゼロの場合の親切なメッセージ表示 */
          <div className="py-24 text-center bg-white border-2 border-dashed border-neutral-100 rounded-[40px] animate-in fade-in duration-500">
            <div className="text-5xl mb-6">🔍</div>
            <p className="text-neutral-600 font-bold text-lg">
              {noResultsMessage}
            </p>
            <p className="text-sm text-neutral-400 mt-3">
              条件をクリアするか、別のキーワードを試してみてください。
            </p>
            <button
              onClick={() => filtering.setSelectedCategory("all")}
              className="mt-6 px-6 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-full text-xs font-bold transition-colors"
            >
              フィルターをリセット
            </button>
          </div>
        ) : (
          /* アイテムが存在する場合の表示 */
          <div className="space-y-12">
            {/* ItemList 内で各アイテムがクリックされた際、
                setSelectedItem を通じてモーダルを開きます。
            */}
            <ItemList items={paginatedItems} onItemClick={setSelectedItem} />

            {/* 2ページ以上ある場合のみページネーションを表示 */}
            {totalPages > 1 && (
              <div className="pt-12 border-t border-neutral-100">
                <Pagination
                  current={currentPage}
                  total={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* 詳細プレビューモーダル */}
      {selectedItem && (
        <PreviewModal
          isOpen={!!selectedItem}
          onClose={handleCloseModal}
          currentItem={selectedItem}
          allFilteredItems={filteredItems}
          onNavigate={handleNavigateModal}
        />
      )}
    </GalleryLayout>
  );
}
