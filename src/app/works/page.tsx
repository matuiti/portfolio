"use client";

import React, { useState } from "react";
import { ALL_WORKS } from "@/data/works";
import { WorkCard } from "./components/WorkCard";
import { WorkDetailModal } from "./components/WorkDetailModal";
import { WorkSearchPanel } from "./components/WorkSearchPanel";
import { Pagination } from "./components/Pagination";
import { useWorkFilter } from "./lib/hooks/useWorkFilter";
import { Work } from "@/types/work";

export default function WorksPage() {
  const {
    filteredWorks,
    selectedCategory,
    selectedTags,
    searchQuery,
    currentPage,
    availableTags,
    setSelectedCategory,
    setSearchQuery,
    setCurrentPage,
    toggleTag,
    selectOnlyTag, // 新しく取得
    selectOnlyCategory, // 新しく取得
    clearFilters,
  } = useWorkFilter(ALL_WORKS);

  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  // ページネーション用
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);
  const currentWorks = filteredWorks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        {/* 検索・フィルターパネル */}
        <WorkSearchPanel
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedTags={selectedTags}
          toggleTag={toggleTag}
          clearFilters={clearFilters}
          availableTags={availableTags}
        />

        {/* 作品グリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {currentWorks.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onClick={() => setSelectedWork(work)}
              onCategorySelectOnly={selectOnlyCategory} // 関数を渡す
              onTagSelectOnly={selectOnlyTag} // 関数を渡す
            />
          ))}
        </div>

        {/* ページネーション */}
        <Pagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />

        {/* 詳細モーダル */}
        {selectedWork && (
          <WorkDetailModal
            isOpen={!!selectedWork}
            onClose={() => setSelectedWork(null)}
            work={selectedWork}
            allFilteredWorks={filteredWorks}
            onNavigate={setSelectedWork}
            onCategorySelectOnly={selectOnlyCategory} // 関数を渡す
            onTagSelectOnly={selectOnlyTag} // 関数を渡す
          />
        )}
      </div>
    </main>
  );
}
