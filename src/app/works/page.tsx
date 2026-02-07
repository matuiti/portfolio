"use client";

import { useState } from "react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { WorkCard } from "./components/WorkCard";
import { WorkSearchPanel } from "./components/WorkSearchPanel";
import { Pagination } from "./components/Pagination";
import { WorkDetailModal } from "./components/WorkDetailModal";
import { useWorkFilter } from "./lib/hooks/useWorkFilter";
import { Work } from "@/types/work";

export default function WorksPage() {
  const {
    selectedCategory,
    selectedTags,
    searchQuery,
    currentPage,
    filteredWorks,
    paginatedWorks,
    totalPages,
    availableTags,
    setSelectedCategory,
    setSearchQuery,
    toggleTag,
    clearFilters,
    setCurrentPage,
  } = useWorkFilter();

  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20 pt-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title="Selected Works"
          description="実務制作から個人開発まで、これまでの実績を公開しています。"
        />

        <div className="flex flex-col gap-10 mt-12">
          {/* anyを削除し、適切な型で渡します [cite: 9] */}
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

          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <p className="text-sm font-medium text-slate-500">
              Showing{" "}
              <span className="text-slate-900 font-bold">
                {filteredWorks.length}
              </span>{" "}
              projects
            </p>
          </div>

          {paginatedWorks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedWorks.map((work) => (
                <WorkCard
                  key={work.id}
                  work={work}
                  onClick={(w) => setSelectedWork(w)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
              <p className="text-slate-400 font-medium">
                該当する実績が見つかりませんでした。
              </p>
            </div>
          )}

          <Pagination
            current={currentPage}
            total={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      {selectedWork && (
        <WorkDetailModal
          isOpen={!!selectedWork}
          onClose={() => setSelectedWork(null)}
          work={selectedWork}
          allFilteredWorks={filteredWorks}
          onNavigate={setSelectedWork}
        />
      )}
    </main>
  );
}
