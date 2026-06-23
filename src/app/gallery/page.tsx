'use client';
import { Suspense, useMemo, useState } from 'react';
import { Cards } from './components/list/Cards';
import { PreviewModal } from './components/modal';
import { Pagination } from '@/components/ui/Pagination';
import { GalleryLayout } from './components/layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TitleAndCount } from '@/components/ui/TitleAndCount';
import { GALLERY_CATEGORIES, PAGE_HEADER_DATA } from './data';
import { ScrollToTopComp } from '@/lib/utility/ScrollToTopComp';
import { LoadingGallery } from './components/ui/LoadingGallery';
import { UIPart } from './types';
import {
  useFilteredUIParts,
  useGalleryStore,
} from '@/lib/store/useGalleryStore';
import { useCommonURLSync } from '@/lib/hooks/useCommonURLSync';

function GalleryPageContent() {
  const store = useGalleryStore();
  const filteredUIParts = useFilteredUIParts();
  const [selectedUIPart, setSelectedUIPart] = useState<UIPart | null>(null);

  useCommonURLSync(
    {
      category: store.selectedCategory,
      tags: store.selectedTags,
      searchQuery: store.searchQuery,
      currentPage: store.currentPage,
    },
    {
      setSelectedCategory: store.setSelectedCategory,
      setSelectedTags: store.setSelectedTags,
      setSearchQuery: store.setSearchQuery,
      setCurrentPage: store.setCurrentPage,
    },
  );

  // 表示データの計算（ページネーション適用）
  const totalPages = Math.ceil(filteredUIParts.length / store.itemsPerPage);
  const displayUIParts = useMemo(() => {
    const start = (store.currentPage - 1) * store.itemsPerPage;
    return filteredUIParts.slice(start, start + store.itemsPerPage);
  }, [filteredUIParts, store.currentPage, store.itemsPerPage]);

  const selectedCategoryLabel = GALLERY_CATEGORIES.find(
    (cat) => cat.id === store.selectedCategory,
  )?.label;

  const breadcrumbItems = [
    { label: 'トップ', href: '/' },
    { label: 'UIギャラリー', href: '/gallery' },
    ...(store.selectedCategory !== 'all'
      ? [{ label: selectedCategoryLabel || '' }]
      : []),
  ];

  const renderedTitle = useMemo(() => {
    if (store.searchQuery) {
      return `「${store.searchQuery}」の検索結果`;
    }
    const baseTitle =
      store.selectedCategory === 'all'
        ? 'すべてのアイテム'
        : selectedCategoryLabel || 'すべてのアイテム';
    const hasTags = store.selectedTags && store.selectedTags.length > 0;
    return (
      <>
        <span>{baseTitle}</span>
        {hasTags && (
          <span className='text-[calc(12/16*1rem)] font-normal ml-2'>
            {store.selectedTags.map((tag) => `#${tag}`).join(' ')}
          </span>
        )}
      </>
    );
  }, [
    store.searchQuery,
    store.selectedCategory,
    store.selectedTags,
    selectedCategoryLabel,
  ]);

  const totalHitCount = filteredUIParts.length;

  return (
    <GalleryLayout>
      <PageHeader
        enTitle={PAGE_HEADER_DATA.enTitle}
        jpTitle={PAGE_HEADER_DATA.jpTitle}
        bgiPath={PAGE_HEADER_DATA.bgiPath}
      />
      <Breadcrumbs items={breadcrumbItems} />
      <div className='space-y-8'>
        <TitleAndCount title={renderedTitle} count={totalHitCount} />
        {displayUIParts.length ? (
          <div className='space-y-12'>
            <Cards items={displayUIParts} onItemClick={setSelectedUIPart} />
            {totalPages > 1 && (
              <Pagination
                current={store.currentPage}
                total={totalPages}
                onPageChange={store.setCurrentPage}
              />
            )}
          </div>
        ) : (
          <div className='py-[calc(80/16*1rem)] text-center border-2 border-dashed border-medium-gray rounded-[calc(24/16*1rem)] mt-[calc(24/16*1rem)] default:mt-[calc(50/16*1rem)]'>
            <p className='text-dark-gray font-bold'>
              該当するパーツは見つかりませんでした。
            </p>
            <p className='text-[calc(14/16*1rem)] text-dark-gray mt-[calc(8/16*1rem)]'>
              条件を変えて再度お試しください。
            </p>
          </div>
        )}
      </div>
      {selectedUIPart && (
        <PreviewModal
          key={selectedUIPart.id}
          isOpen={!!selectedUIPart}
          onClose={() => setSelectedUIPart(null)}
          currentItem={selectedUIPart}
          allFilteredItems={displayUIParts}
          onNavigate={setSelectedUIPart}
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
