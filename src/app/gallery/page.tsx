'use client';
import { Suspense, useState } from 'react';
import { Pagination } from '@/components/ui/Pagination';
import { GalleryLayout } from './components/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TitleAndCount } from '@/components/ui/TitleAndCount';
import { GALLERY_CATEGORIES, PAGE_HEADER_DATA } from './data';
import { ScrollToTopComp } from '@/lib/utility/ScrollToTopComp';
import { LoadingGallery } from './components/LoadingGallery';
import { GalleryUIPart } from './types';
import {
  useFilteredUIParts,
  useGalleryStore,
} from '@/lib/store/useGalleryStore';
import { Card } from './components/Card';
import { PreviewModal } from './components/Card/preview/PreviewModal';
import { useURLSync } from '@/lib/hooks/useURLSync';

function GalleryPageContent() {
  const store = useGalleryStore();
  const filteredUIParts = useFilteredUIParts();
  const [selectedUIPart, setSelectedUIPart] = useState<GalleryUIPart | null>(
    null,
  );

  useURLSync(
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

  const totalPages = Math.ceil(filteredUIParts.length / store.itemsPerPage);

  const start = (store.currentPage - 1) * store.itemsPerPage;
  const displayUIParts = filteredUIParts.slice(
    start,
    start + store.itemsPerPage,
  );

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

  const baseTitle =
    store.selectedCategory === 'all'
      ? 'すべてのアイテム'
      : selectedCategoryLabel || 'すべてのアイテム';

  const hasTags = store.selectedTags && store.selectedTags.length > 0;
  const renderedTitle = store.searchQuery ? (
    `「${store.searchQuery}」の検索結果`
  ) : (
    <>
      <span>{baseTitle}</span>
      {hasTags && (
        <span className='text-[calc(12/16*1rem)] font-normal ml-2'>
          {store.selectedTags.map((tag) => `#${tag}`).join(' ')}
        </span>
      )}
    </>
  );

  const totalHitCount = filteredUIParts.length;

  return (
    <GalleryLayout>
      <PageHeader
        enTitle={PAGE_HEADER_DATA.enTitle}
        jpTitle={PAGE_HEADER_DATA.jpTitle}
        bgiPath={PAGE_HEADER_DATA.bgiPath}
      />
      <div className='section-padding-x'>
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      {/* コンテンツ */}
      <div className='section-padding-x pb-15 pt-10 default:pt-12.5 bg-light-gray'>
        <TitleAndCount title={renderedTitle} count={totalHitCount} />
        {displayUIParts.length ? (
          <>
            <div className='flex flex-col justify-center w-full gap-y-[calc(40/16*1rem)] mt-[calc(60/16*1rem)] base:mt-[calc(50/16*1rem)]'>
              {displayUIParts.map((item) => (
                <Card
                  key={item.id}
                  item={item}
                  onExpand={() => setSelectedUIPart(item)}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <div className='mt-[calc(60/16*1rem)]'>
                <Pagination
                  current={store.currentPage}
                  total={totalPages}
                  onPageChange={store.setCurrentPage}
                />
              </div>
            )}
          </>
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
