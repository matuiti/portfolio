"use client";

import React, { useState, useMemo } from "react";
import { WorkCard } from "./components/WorkCard";
import { WorkDetailModal } from "./components/WorkDetailModal";
import { WorkSearchPanel } from "./components/WorkSearchPanel";
import { Pagination } from "./components/Pagination";
import { useWorkStore, useFilteredWorks } from "@/store/useWorkStore";
import { Work } from "@/types/work";

export default function WorksPage() {
  // ストアから状態とアクションを取得
  const { currentPage, itemsPerPage, setCurrentPage } = useWorkStore();
  const filteredWorks = useFilteredWorks();
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  // ページネーション計算
  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);
  const currentWorks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredWorks.slice(start, start + itemsPerPage);
  }, [filteredWorks, currentPage, itemsPerPage]);

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        <WorkSearchPanel /> {/* Props不要 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {currentWorks.map((work) => (
            <WorkCard
              key={work.id}
              work={work}
              onClick={() => setSelectedWork(work)}
            />
          ))}
        </div>
        <Pagination
          current={currentPage}
          total={totalPages}
          onPageChange={setCurrentPage}
        />
        {selectedWork && (
          <WorkDetailModal
            isOpen={!!selectedWork}
            onClose={() => setSelectedWork(null)}
            work={selectedWork}
            onNavigate={setSelectedWork}
          />
        )}
      </div>
    </main>
  );
}
