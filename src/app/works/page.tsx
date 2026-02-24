// src/app/works/page.tsx
"use client";

import React, { useState, Suspense, useMemo } from "react";
import { useWorkStore, useFilteredWorks } from "@/store/useWorkStore";
import { WorkCard } from "./components/WorkCard";
import { WorkDetailModal } from "./components/WorkDetailModal";
import { Pagination } from "./components/Pagination";
import { WorksLayout } from "./components/WorksLayout";
import { Work, WorkFilterCategory } from "@/types/work";
import { useCommonURLSync } from "@/lib/hooks/useCommonURLSync";

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

  return (
    <WorksLayout>
      {/* 実績一覧のヘッダー [cite: 40] */}
      <div className="mb-[calc(48/16*1rem)]">
        <h1 className="text-[calc(36/16*1rem)] font-black mb-[calc(16/16*1rem)]">
          WORKS
        </h1>
        <p className="text-dark-gray leading-relaxed max-w-mv-height-tablet">
          プロジェクト実績のアーカイブ。
          サイドバーのフィルターを使用することで、特定の技術スタックやカテゴリで瞬時に絞り込むことが可能です。
        </p>
      </div>

      {/* 実績グリッド一覧 [cite: 3, 40] */}
      {displayWorks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[calc(32/16*1rem)]">
          {displayWorks.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onClick={() => setSelectedWork(work)}
              // カード内のカテゴリクリック時もストアを更新 [cite: 92]
              onCategoryClick={(cat) => store.selectOnlyCategory(cat)}
            />
          ))}
        </div>
      ) : (
        /* 検索結果ゼロ時の表示 [cite: 40] */
        <div className="py-[calc(80/16*1rem)] text-center border-2 border-dashed border-medium-gray rounded-[calc(24/16*1rem)]">
          <p className="text-dark-gray font-bold">
            該当する実績は見つかりませんでした。
          </p>
          <p className="text-[calc(14/16*1rem)] text-medium-gray mt-[calc(8/16*1rem)]">
            条件を変えて再度お試しください。
          </p>
        </div>
      )}

      {/* ページネーション [cite: 2, 40] */}
      {totalPages > 1 && (
        <Pagination
          current={store.currentPage}
          total={totalPages}
          onPageChange={store.setCurrentPage}
        />
      )}

      {/* 詳細モーダル：Pure UI コンポーネントに WORKS 用のロジックを注入 [cite: 3, 41] */}
      {selectedWork && (
        <WorkDetailModal
          isOpen={!!selectedWork}
          onClose={() => setSelectedWork(null)}
          work={selectedWork}
          allFilteredWorks={filteredWorks}
          onNavigate={setSelectedWork}
          onCategoryClick={handleCategoryAction} // ここでロジックを注入
          onTagClick={handleTagAction} // ここでロジックを注入
        />
      )}
    </WorksLayout>
  );
}

/**
 * ページのルートコンポーネント
 * useSearchParams 等のクライアントサイド・フックを使用するため、Suspense でラップします [cite: 38, 41]。
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