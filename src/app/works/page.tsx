'use client';
import { useState, Suspense, useMemo } from 'react';
import { useWorkStore, useFilteredWorks } from '@/lib/store/useWorkStore';
import { WorkCard } from './components/WorkCard';
import { WorkDetailModal } from './components/WorkDetailModal';
import { Pagination } from '@/components/ui/Pagination';
import { WorksLayout } from './components/WorksLayout';
import { Work, WorkCategory } from '@/types/work';
import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { TitleAndCount } from '@/components/ui/TitleAndCount';
import { WORK_CATEGORIES } from '@/data/works';
import { PAGE_HEADER_DATA } from './data';
import { ScrollToTopComp } from '@/lib/utility/ScrollToTopComp';
import { LoadingWorks } from './components/LoadingWorks';
import { useURLSync } from '@/lib/hooks/useURLSync';

function WorksPageContent() {
  const store = useWorkStore();
  const filteredWorks = useFilteredWorks();
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

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

  // 表示データの計算（ページネーション適用）
  const totalPages = Math.ceil(filteredWorks.length / store.itemsPerPage);
  const displayWorks = useMemo(() => {
    const start = (store.currentPage - 1) * store.itemsPerPage;
    return filteredWorks.slice(start, start + store.itemsPerPage);
  }, [filteredWorks, store.currentPage, store.itemsPerPage]);

  // 詳細モーダル用のアクション定義
  const handleCategoryAction = (cat: WorkCategory) => {
    store.selectOnlyCategory(cat);
    setSelectedWork(null); // モーダルを閉じる
  };
  const handleTagAction = (tag: string) => {
    store.selectOnlyTag(tag);
    setSelectedWork(null); // モーダルを閉じる
  };

  const selectedCategoryLabel = WORK_CATEGORIES.find(
    (cat) => cat.id === store.selectedCategory,
  )?.label;

  const breadcrumbItems = [
    { label: 'トップ', href: '/' },
    { label: '制作実績', href: '/works' },
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
        ? '制作実績'
        : selectedCategoryLabel || '制作実績';
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

  const totalHitCount = filteredWorks.length;

  return (
    <WorksLayout>
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
        <p className='mt-[calc(10/16*1rem)]'>
          機密保持契約を遵守するため、実案件の一部については内容を抽象化して掲載しております。
        </p>
        {/* 実績カードグリッド */}
        {displayWorks.length ? (
          <>
            <div className='mt-[calc(40/16*1rem)] grid justify-center gap-y-[calc(40/16*1rem)] gap-x-[calc(20/16*1rem)] grid-cols-1 tablet:grid-cols-2 base:grid-cols-3 base:mt-[calc(50/16*1rem)]'>
              {displayWorks.map((work) => (
                <WorkCard
                  key={work.id}
                  work={work}
                  onClick={() => setSelectedWork(work)}
                  onCategoryClick={store.selectOnlyCategory}
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
              該当する実績は見つかりませんでした。
            </p>
            <p className='text-[calc(14/16*1rem)] text-dark-gray mt-[calc(8/16*1rem)]'>
              条件を変えて再度お試しください。
            </p>
          </div>
        )}
      </div>

      {/* 詳細モーダル */}
      {selectedWork && (
        <WorkDetailModal
          key={selectedWork.id}
          isOpen={!!selectedWork}
          onClose={() => setSelectedWork(null)}
          work={selectedWork}
          allFilteredWorks={filteredWorks}
          onNavigate={setSelectedWork}
          onCategoryClick={handleCategoryAction}
          onTagClick={handleTagAction}
        />
      )}
    </WorksLayout>
  );
}

/* ページルート */
export default function WorksPage() {
  return (
    <>
      <ScrollToTopComp />
      <Suspense fallback={<LoadingWorks />}>
        <WorksPageContent />
      </Suspense>
    </>
  );
}
