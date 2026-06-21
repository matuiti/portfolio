'use client';
import { useState, Suspense, useMemo } from 'react';
import { useWorkStore, useFilteredWorks } from '@/lib/hooks/useWorkStore';
import { WorkCard } from './components/WorkCard';
import { WorkDetailModal } from './components/WorkDetailModal';
import { Pagination } from '@/components/ui/Pagination';
import { WorksLayout } from './components/WorksLayout';
import { Work, WorkFilterCategory } from '@/types/work';
import { useCommonURLSync } from '@/lib/hooks/useCommonURLSync';
import { PageHeader } from '@/components/ui/PageHeader';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { WORK_CATEGORIES } from '@/data/works';
import { TitleAndCount } from '@/components/ui/TitleAndCount';
import { ScrollToTop } from '@/lib/utility/ScrollToTop';
import { PAGE_HEADER_DATA } from './data';
import styles from './Works.module.css';

function WorksPageContent() {
  const store = useWorkStore();
  const filteredWorks = useFilteredWorks();

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

  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  // 表示データの計算（ページネーション適用）
  const totalPages = Math.ceil(filteredWorks.length / store.itemsPerPage);
  const displayWorks = useMemo(() => {
    const start = (store.currentPage - 1) * store.itemsPerPage;
    return filteredWorks.slice(start, start + store.itemsPerPage);
  }, [filteredWorks, store.currentPage, store.itemsPerPage]);

  // 詳細モーダル用のアクション定義
  const handleCategoryAction = (cat: string) => {
    store.selectOnlyCategory(cat as WorkFilterCategory);
    setSelectedWork(null); // モーダルを閉じる
  };
  const handleTagAction = (tag: string) => {
    store.selectOnlyTag(tag);
    setSelectedWork(null); // モーダルを閉じる
  };

  // カテゴリーIDからラベルを取得するロジック
  const selectedCategoryLabel = WORK_CATEGORIES.find(
    (cat) => cat.value === store.selectedCategory,
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
        <p className={styles.pageDescription}>
          機密保持契約を遵守するため、実案件の一部については内容を抽象化して掲載しております。
        </p>
        {/* 実績カードグリッド */}
        {displayWorks.length ? (
          <div className={styles.cards}>
            {displayWorks.map((work) => (
              <WorkCard
                key={work.id}
                work={work}
                onClick={() => setSelectedWork(work)}
                onCategoryClick={store.selectOnlyCategory}
                className={styles.card}
              />
            ))}
          </div>
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
        {/* ページネーション */}
        {totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              current={store.currentPage}
              total={totalPages}
              onPageChange={store.setCurrentPage}
            />
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
      <ScrollToTop />
      <Suspense
        fallback={
          <div className='p-[calc(80/16*1rem)] text-center font-bold'>
            Loading Works...
          </div>
        }
      >
        <WorksPageContent />
      </Suspense>
    </>
  );
}
