"use client";

import React, { useState } from "react";
import { useWorkStore, useFilteredWorks } from "@/store/useWorkStore";
import { useWorkURLSync } from "./lib/hooks/useWorkURLSync";
import { WorkCard } from "./components/WorkCard";
import { WorkDetailModal } from "./components/WorkDetailModal";
import { Pagination } from "./components/Pagination";
import { Work } from "@/types/work";
import { WorkSearchPanel } from "./components/WorkSearchPanel";

export default function WorksPage() {
  // 1. URL同期の有効化
  useWorkURLSync();

  // 2. フィルタリング済みデータの取得
  const filteredWorks = useFilteredWorks();

  // 3. ページネーション用状態の取得
  const { currentPage, itemsPerPage, setCurrentPage } = useWorkStore();

  // 4. 詳細表示用の状態
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  // ページネーション処理
  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);
  const displayWorks = filteredWorks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <main className="min-h-screen pt-24 pb-20 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* ヘッダー・検索パネル */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">
            WORKS
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl mb-10">
            プロジェクト実績のアーカイブ。
            特定の技術スタックやカテゴリで絞り込み検索が可能です。
          </p>
          <WorkSearchPanel />
        </div>

        {/* ワークカード一覧 */}
        {displayWorks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {displayWorks.map((work) => (
              <WorkCard
                key={work.id}
                work={work}
                onClick={() => setSelectedWork(work)}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-slate-400 font-bold">
              該当する実績は見つかりませんでした。
            </p>
          </div>
        )}

        {/* ページネーション */}
        {totalPages > 1 && (
          <Pagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {/* 詳細モーダル：ここが修正箇所です */}
      {selectedWork && (
        <WorkDetailModal
          isOpen={!!selectedWork}
          onClose={() => setSelectedWork(null)}
          work={selectedWork}
          allFilteredWorks={filteredWorks} // 現在表示（フィルタ）されている全リストを渡す
          onNavigate={setSelectedWork}
        />
      )}
    </main>
  );
}
