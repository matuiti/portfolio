'use client';
import { useState, Suspense, useMemo } from 'react';
import { useWorkStore, useFilteredWorks } from '@/store/useWorkStore';
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
import styles from './Works.module.css';

/**
 * WORKS ページのメインコンテンツコンポーネント
 * ストアの状態管理と、各 UI パーツへのロジック注入を統括します。
 */
function WorksContent() {
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

  /**
   * ロジックの注入：実績詳細モーダル内でのアクション定義
   * WORKS ページでは遷移せず、その場でストアを更新（再フィルタリング）します。
   */
  const handleCategoryAction = (cat: string) => {
    // 他のフィルタをリセットし、該当カテゴリのみで絞り込む
    store.selectOnlyCategory(cat as WorkFilterCategory);
    setSelectedWork(null); // アクション実行後にモーダルを閉じる
  };

  const handleTagAction = (tag: string) => {
    // カテゴリを「すべて」にし、該当タグ 1 つだけで絞り込む
    store.selectOnlyTag(tag);
    setSelectedWork(null); // アクション実行後にモーダルを閉じる
  };

  const PAGE_HEADER_IMAGE_PATH = '/assets/images/common/bg-page-header.jpg';
  const PAGE_HEADER_DATA = {
    jpTitle: '制作実績',
    enTitle: 'WORKS',
    bgiPath: PAGE_HEADER_IMAGE_PATH,
  } as const;

  // カテゴリーIDからラベルを取得するロジック [9]
  const selectedCategoryLabel = WORK_CATEGORIES.find(
    (cat) => cat.value === store.selectedCategory,
  )?.label;

  const breadcrumbItems = [
    { label: 'トップ', href: '/' },
    { label: '制作実績', href: '/works' },
    // カテゴリーが「すべて」以外なら追加
    ...(store.selectedCategory !== 'all'
      ? [{ label: selectedCategoryLabel || '' }]
      : []),
    // 検索クエリがあれば追加
    ...(store.searchQuery
      ? [{ label: `「${store.searchQuery}」の検索結果` }]
      : []),
  ];

  // 1. カテゴリのラベルを取得（例: "Web制作"） [5]
  const activeCategoryLabel = WORK_CATEGORIES.find(
    (cat) => cat.value === store.selectedCategory,
  )?.label;

  // 2. 表記を変化させるタイトルのロジック
  let displayTitle = '制作実績'; // デフォルト

  if (store.searchQuery) {
    // 検索ワードがある場合を最優先
    displayTitle = `「${store.searchQuery}」の検索結果`;
  } else if (store.selectedCategory !== 'all') {
    // カテゴリが選択されている場合
    displayTitle = activeCategoryLabel || '制作実績';
  }

  // 3. 件数の取得
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
        <TitleAndCount title={displayTitle} count={totalHitCount} />
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
                onCategoryClick={(cat) => store.selectOnlyCategory(cat)}
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

/**
 * ページのルートコンポーネント
 * useSearchParams 等のクライアントサイド・フックを使用するため、Suspense でラップします。
 */
export default function WorksPage() {
  return (
    <Suspense
      fallback={
        <div className='p-[calc(80/16*1rem)] text-center font-bold'>
          Loading Works...
        </div>
      }
    >
      <WorksContent />
    </Suspense>
  );
}
