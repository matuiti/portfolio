"use client";

import { Suspense } from "react";
import { UI_PARTS } from "@/gallery/data/ui-parts";
import { GalleryLayout } from "./components/layout/GalleryLayout";
import { ItemList } from "./components/list/ItemList";
import { Pagination } from "@/components/ui/Pagination";
import { PreviewModal } from "./components/modal/PreviewModal";
import { NoResults } from "./components/list/NoResults";
import { LoadingGallery } from "./components/ui/LoadingGallery";
import { useFiltering } from "./lib/hooks/useFiltering";
import { useURLSync } from "./lib/hooks/useURLSync";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CATEGORIES } from "./data/categories";
import { PageHeader } from "@/components/ui/PageHeader";
import { TitleAndCount } from "@/components/ui/TitleAndCount";

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
    selectedCategory,
    searchQuery,
  } = filtering;

  const PAGE_HEADER_IMAGE_PATH = "/assets/images/common/bg-page-header.jpg";
  const PAGE_HEADER_DATA = {
    jpTitle: "UIギャラリー",
    enTitle: "GALLERY",
    images: PAGE_HEADER_IMAGE_PATH,
    bgPath: `url(${PAGE_HEADER_IMAGE_PATH})`,
  } as const;

  const activeCategoryLabel = CATEGORIES.find(
    (cat) => cat.id === selectedCategory,
  )?.label;

  const breadcrumbItems = [
    { label: "トップ", href: "/" },
    { label: "UIギャラリー", href: "/gallery" },
    // カテゴリが選択されている（"all"以外）なら追加
    ...(selectedCategory !== "all" && activeCategoryLabel
      ? [{ label: activeCategoryLabel }]
      : []),
    // 検索ワードがある場合はさらに追加
    ...(searchQuery ? [{ label: `「${searchQuery}」の検索結果` }] : []),
  ];

  return (
    <GalleryLayout filtering={filtering}>
      {/* ページヘッダー */}
      <PageHeader
        enTitle={PAGE_HEADER_DATA.enTitle}
        jpTitle={PAGE_HEADER_DATA.jpTitle}
        bgImage={PAGE_HEADER_DATA.images}
      />
      {/* パンくずリスト */}
      <Breadcrumbs items={breadcrumbItems} />
      <div className="space-y-8">
        <TitleAndCount title={displayTitle} count={totalHitCount} />

        {isEmpty ? (
          <NoResults message={noResultsMessage} onReset={clearFilters} />
        ) : (
          <div className="space-y-12">
            <ItemList items={paginatedItems} onItemClick={setSelectedItem} />
            {totalPages > 1 && (
              <Pagination
                current={currentPage}
                total={totalPages}
                onPageChange={setCurrentPage}
              />
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
