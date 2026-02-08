// src/app/works/page.tsx
"use client";

import React, { useState } from "react";
import { useWorkStore, useFilteredWorks } from "@/store/useWorkStore";
import { useWorkURLSync } from "./lib/hooks/useWorkURLSync";
import { WorkCard } from "./components/WorkCard";
import { WorkDetailModal } from "./components/WorkDetailModal";
import { Pagination } from "./components/Pagination";
import { WorksLayout } from "./components/WorksLayout"; // ステップ1・2で作成
import { Work } from "@/types/work";

/**
 * WORKS ページコンポーネント
 * UIギャラリーと統一されたサイドバー/ドロワー形式の検索UIを採用しています。
 */
export default function WorksPage() {
  // 1. URL同期の有効化 (category, tags, q パラメータをストアと同期)
  useWorkURLSync();

  // 2. フィルタリング済みデータの取得 (Zustandストアの状態に連動)
  const filteredWorks = useFilteredWorks();

  // 3. ページネーション用状態の取得
  const { currentPage, itemsPerPage, setCurrentPage } = useWorkStore();

  // 4. 詳細モーダル表示用の状態
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  // ページネーション計算
  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);
  const displayWorks = filteredWorks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <WorksLayout>
      {/* ページヘッダーエリア */}
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter mb-4">
          WORKS
        </h1>
        <p className="text-sm md:text-base text-slate-500 font-medium max-w-2xl leading-relaxed">
          プロジェクト実績のアーカイブ。
          サイドバーのフィルターを使用することで、特定の技術スタックやカテゴリで瞬時に絞り込むことが可能です。
        </p>
      </header>

      {/* 実績グリッド一覧 */}
      <section aria-label="実績一覧">
        {displayWorks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {displayWorks.map((work) => (
              <WorkCard
                key={work.id}
                work={work}
                onClick={() => setSelectedWork(work)}
              />
            ))}
          </div>
        ) : (
          /* 検索結果ゼロ時の表示 */
          <div className="py-20 text-center bg-white rounded-4xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-bold">
              該当する実績は見つかりませんでした。
            </p>
            <p className="text-xs text-slate-400 mt-2">
              条件を変えて再度お試しください。
            </p>
          </div>
        )}
      </section>

      {/* ページネーション */}
      <footer className="mt-12">
        {totalPages > 1 && (
          <Pagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </footer>

      {/* 詳細モーダル (フィルタリング結果を保持したまま前後移動が可能) */}
      {selectedWork && (
        <WorkDetailModal
          isOpen={!!selectedWork}
          onClose={() => setSelectedWork(null)}
          work={selectedWork}
          allFilteredWorks={filteredWorks}
          onNavigate={setSelectedWork}
        />
      )}
    </WorksLayout>
  );
}
