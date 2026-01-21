"use client";

import { Suspense } from "react";
import { UI_PARTS } from "@/data/gallery/ui-parts";
import { useFiltering } from "@/lib/hooks/useFiltering";
import { useURLSync } from "@/lib/hooks/useURLSync";
import { GalleryLayout } from "./components/layout/GalleryLayout";
import { ItemList } from "./components/list/ItemList";
import { TitleAndCount } from "./components/ui/TitleAndCount";
import { Pagination } from "./components/list/Pagination";
import { PreviewModal } from "./components/modal/PreviewModal";
import { NoResults } from "./components/list/NoResults";
import { LoadingGallery } from "./components/ui/LoadingGallery";

// 1. ロジックを「GalleryContent」として切り出す
function GalleryContent() {
  const filtering = useFiltering(UI_PARTS || []);
  useURLSync(filtering);

  const {
    selectedItem,
    displayTitle,
    totalHitCount,
    isEmpty,
    paginatedItems,
    filteredItems,
    noResultsMessage,
    currentPage,
    totalPages,
    clearFilters,
    setSelectedItem,
    setCurrentPage,
  } = filtering;

  return (
    <GalleryLayout filtering={filtering}>
      <div className="space-y-8">
        <TitleAndCount title={displayTitle} count={totalHitCount} />

        {isEmpty ? (
          <NoResults message={noResultsMessage} onReset={clearFilters} />
        ) : (
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
          key={selectedItem.id}
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

// 2. 本体の Export は Suspense でラップするだけにする
export default function GalleryPage() {
  return (
    <Suspense fallback={<LoadingGallery />}>
      <GalleryContent />
    </Suspense>
  );
}
