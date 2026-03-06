// src/app/works/page.tsx
"use client";

import React, { useState, Suspense, useMemo } from "react";
import { useWorkStore, useFilteredWorks } from "@/store/useWorkStore";
import { WorkCard } from "./components/WorkCard";
import { WorkDetailModal } from "./components/WorkDetailModal";
import { Pagination } from "@/components/ui/Pagination";
import { WorksLayout } from "./components/WorksLayout";
import { Work, WorkFilterCategory } from "@/types/work";
import { useCommonURLSync } from "@/lib/hooks/useCommonURLSync";
import { PageHeader } from "@/components/ui/PageHeader";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WORK_CATEGORIES } from "@/data/works";
import { TitleAndCount } from "@/components/ui/TitleAndCount";
import styles from "./Works.module.scss";

/**
 * WORKS ページのメインコンテンツコンポーネント
 * ストアの状態管理と、各 UI パーツへのロジック注入を統括します。
 */
function WorksContent() {
  // 1. ストアから状態とアクションを取得 [cite: 38, 198]
  const store = useWorkStore();
  const filteredWorks = useFilteredWorks(); // フィルタリング済みデータ [cite: 200]

  // 2. 共通 URL 同期システム（URL パラメータとストアの双方向同期） [cite: 1, 38, 185]
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

  // 3. ローカル状態：現在詳細を表示している実績 [cite: 39]
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  // 4. 表示データの計算（ページネーション適用） [cite: 39]
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
    // 他のフィルタをリセットし、該当カテゴリのみで絞り込む [cite: 30, 368]
    store.selectOnlyCategory(cat as WorkFilterCategory);
    setSelectedWork(null); // アクション実行後にモーダルを閉じる
  };

  const handleTagAction = (tag: string) => {
    // カテゴリを「すべて」にし、該当タグ 1 つだけで絞り込む [cite: 29, 367]
    store.selectOnlyTag(tag);
    setSelectedWork(null); // アクション実行後にモーダルを閉じる
  };

  const PAGE_HEADER_IMAGE_PATH = "/assets/images/common/bg-page-header.jpg";
  const PAGE_HEADER_DATA = {
    jpTitle: "制作実績",
    enTitle: "WORKS",
    images: PAGE_HEADER_IMAGE_PATH,
    bgPath: `url(${PAGE_HEADER_IMAGE_PATH})`,
  } as const;

  // カテゴリーIDからラベルを取得するロジック [9]
  const selectedCategoryLabel = WORK_CATEGORIES.find(
    (cat) => cat.value === store.selectedCategory,
  )?.label;

  const breadcrumbItems = [
    { label: "トップ", href: "/" },
    { label: "制作実績", href: "/works" },
    // カテゴリーが「すべて」以外なら追加
    ...(store.selectedCategory !== "all"
      ? [{ label: selectedCategoryLabel || "" }]
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
  let displayTitle = "制作実績"; // デフォルト

  if (store.searchQuery) {
    // 検索ワードがある場合を最優先
    displayTitle = `「${store.searchQuery}」の検索結果`;
  } else if (store.selectedCategory !== "all") {
    // カテゴリが選択されている場合
    displayTitle = activeCategoryLabel || "制作実績";
  }

  // 3. 件数の取得
  const totalHitCount = filteredWorks.length;

  return (
    <WorksLayout>
      {/* ページヘッダー */}
      <PageHeader
        enTitle={PAGE_HEADER_DATA.enTitle}
        jpTitle={PAGE_HEADER_DATA.jpTitle}
        bgImage={PAGE_HEADER_DATA.images}
      />
      {/* パンくずリスト */}
      <div className="section-padding-x">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      {/* コンテンツ */}
      <div className="section-padding-x pb-15 pt-10 default:pt-12.5 bg-light-gray">
        {/* タイトル、検索ヒット件数 */}
        <TitleAndCount title={displayTitle} count={totalHitCount} />
        {/* 補足文 */}
        <p className={styles.pageDescription}>
          機密保持契約を遵守するため、実案件の一部については名称や画像を伏せ、内容を抽象化して掲載しております。
        </p>
        {/* 実績グリッド一覧 */}
        {displayWorks.length > 0 ? (
          <div className={styles.cards}>
            {displayWorks.map((work) => (
              <WorkCard
                key={work.id}
                work={work}
                onClick={() => setSelectedWork(work)}
                // カード内のカテゴリクリック時もストアを更新
                onCategoryClick={(cat) => store.selectOnlyCategory(cat)}
                className={styles.card}
              />
            ))}
          </div>
        ) : (
          /* 検索結果ゼロ時の表示 */
          <div className="py-[calc(80/16*1rem)] text-center border-2 border-dashed border-medium-gray rounded-[calc(24/16*1rem)]">
            <p className="text-dark-gray font-bold">
              該当する実績は見つかりませんでした。
            </p>
            <p className="text-[calc(14/16*1rem)] text-medium-gray mt-[calc(8/16*1rem)]">
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
        <div className="p-[calc(80/16*1rem)] text-center font-bold">
          Loading Works...
        </div>
      }
    >
      <WorksContent />
    </Suspense>
  );
}
