"use client";

import { useState, useMemo, Suspense } from "react";
import { X } from "lucide-react";
import { ALL_WORKS } from "@/data/works";
import { Work } from "@/types/work";

// 以前作成したパーツのインポート
import { useWorkFilter } from "./lib/hooks/useWorkFilter";
import { useWorkURLSync } from "./lib/hooks/useWorkURLSync";
import { WorkSearchPanel } from "./components/WorkSearchPanel";
import { WorkCard } from "./components/WorkCard";
import { Pagination } from "./components/Pagination";

/**
 * メインコンテンツコンポーネント
 * フィルタリング、リスト表示、ページネーション、詳細モーダルを統括します。
 */
function WorksContent() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  // 1. フィルタリングロジックの呼び出し
  const filter = useWorkFilter();

  // 2. URLパラメータとの同期（検索条件やページ番号をURLに反映）
  useWorkURLSync(filter);

  // 3. 全データから重複なしのタグ一覧を抽出（検索パネル用）
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    ALL_WORKS.forEach((w: Work) => w.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      {/* ヘッダーエリア */}
      <header className="mb-12">
        <p className="text-blue-600 font-black tracking-widest mb-2">
          PORTFOLIO
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900">
          Works
        </h1>
      </header>

      {/* 検索・絞り込みパネル */}
      <WorkSearchPanel {...filter} availableTags={availableTags} />

      {/* 作品グリッド表示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filter.paginatedWorks.map((work: Work) => (
          <WorkCard
            key={work.id}
            work={work}
            onClick={(w) => setSelectedWork(w)}
          />
        ))}
      </div>

      {/* ページネーション */}
      <div className="mt-4">
        <Pagination
          current={filter.currentPage}
          total={filter.totalPages}
          onPageChange={filter.setCurrentPage}
        />
      </div>

      {/* 詳細モーダル */}
      {selectedWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* 背景オーバーレイ */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedWork(null)}
          />

          {/* モーダルコンテンツ */}
          <div className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 md:p-12 shadow-2xl animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
              aria-label="閉じる"
            >
              <X size={24} />
            </button>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex gap-2">
                  {selectedWork.category.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                  {selectedWork.title}
                </h2>
                <p className="text-slate-600 leading-relaxed text-lg">
                  {selectedWork.summary}
                </p>
              </div>

              {/* プロジェクト詳細情報（適宜項目を追加してください） */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900">Description</h3>
                  <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-wrap">
                    {selectedWork.description}
                  </p>
                </section>
                <section className="space-y-3">
                  <h3 className="font-bold text-slate-900">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedWork.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-bold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </section>
              </div>

              {/* URLがある場合のボタン */}
              {selectedWork.url && selectedWork.disclosureLevel !== "NDA" && (
                <div className="pt-6">
                  <a
                    href={selectedWork.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95"
                  >
                    Visit Project Site
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * ページのエントリーポイント
 * useSearchParams等を使用するためSuspenseでラップします。
 */
export default function WorksPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-slate-400 font-bold animate-pulse">
            Loading Works...
          </div>
        </div>
      }
    >
      <WorksContent />
    </Suspense>
  );
}
