'use client';
import { Suspense } from 'react';
import { NoResults } from './components/list/NoResults';
import { useFiltering } from './lib/hooks/useFiltering';
import { Cards } from './components/list/Cards';
import { PreviewModal } from './components/modal';
import { Pagination } from '@/components/ui/Pagination';
import { GalleryLayout } from './components/layout';
import { useURLSync } from './lib/hooks/useURLSync';
import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TitleAndCount } from '@/components/ui/TitleAndCount';
import { UI_PARTS } from '@/gallery/data/ui-parts';
import { GALLERY_CATEGORIES, PAGE_HEADER_DATA } from './data';
import { ScrollToTopComp } from '@/lib/utility/ScrollToTopComp';
import { LoadingGallery } from './components/ui/LoadingGallery';

function GalleryPageContent() {
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

  const activeCategoryLabel = GALLERY_CATEGORIES.find(
    (cat) => cat.id === selectedCategory,
  )?.label;

  const breadcrumbItems = [
    { label: 'トップ', href: '/' },
    { label: 'UIギャラリー', href: '/gallery' },
    // カテゴリが選択されている（"all"以外）なら追加
    ...(selectedCategory !== 'all' && activeCategoryLabel
      ? [{ label: activeCategoryLabel }]
      : []),
    // 検索ワードがある場合はさらに追加
    ...(searchQuery ? [{ label: `「${searchQuery}」の検索結果` }] : []),
  ];

  return (
    <GalleryLayout filtering={filtering}>
      <PageHeader
        enTitle={PAGE_HEADER_DATA.enTitle}
        jpTitle={PAGE_HEADER_DATA.jpTitle}
        bgiPath={PAGE_HEADER_DATA.bgiPath}
      />
      <Breadcrumbs items={breadcrumbItems} />
      <div className='space-y-8'>
        <TitleAndCount title={displayTitle} count={totalHitCount} />
        {isEmpty ? (
          <NoResults message={noResultsMessage} onReset={clearFilters} />
        ) : (
          <div className='space-y-12'>
            <Cards items={paginatedItems} onItemClick={setSelectedItem} />
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

/* ページルート */
export default function GalleryPage() {
  return (
    <>
      <ScrollToTopComp />
      <Suspense fallback={<LoadingGallery />}>
        <GalleryPageContent />
      </Suspense>
    </>
  );
}
