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
import { NoResults } from "./components/list/NoResults";

export default function GalleryPage() {
  // すべての知能をフックに集約
  const filtering = useFiltering(UI_PARTS || []);

  // URL同期の副作用を実行
  useURLSync(filtering);

  // フックから必要な情報のみを取り出す
  const {
    displayTitle,
    totalHitCount,
    isEmpty,
    paginatedItems,
    filteredItems,
    noResultsMessage,
    currentPage,
    totalPages,
    clearFilters,
    setCurrentPage
  } = filtering;

  const [selectedItem, setSelectedItem] = useState<UIPart | null>(null);

  return (
    <GalleryLayout filtering={filtering}>
      <div className="space-y-8">
        <TitleAndCount title={displayTitle} count={totalHitCount} />

        {isEmpty ? (
          <NoResults
            message={noResultsMessage}
            onReset={clearFilters}
          />
        ) : (
          /* アイテム一覧表示 */
          <div className="space-y-12">
            <ItemList items={paginatedItems} onItemClick={setSelectedItem} />
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

      {selectedItem && (
        <PreviewModal
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          currentItem={selectedItem}
          allFilteredItems={filteredItems}
          onNavigate={setSelectedItem}
        />
      )}
    </GalleryLayout>
  );
}
