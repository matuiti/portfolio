// src/app/works/page.tsx

"use client";

import { useState, useMemo, Suspense, useCallback } from "react"; // useEffectを削除
import { X } from "lucide-react";
import { ALL_WORKS } from "@/data/works";
import { Work } from "@/types/work";
import { useWorkFilter } from "./lib/hooks/useWorkFilter";
import { useWorkURLSync } from "./lib/hooks/useWorkURLSync";
import { WorkSearchPanel } from "./components/WorkSearchPanel";
import { WorkCard } from "./components/WorkCard";
import { Pagination } from "./components/Pagination";

function WorksContent() {
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const filter = useWorkFilter();

  /**
   * コールバックをメモ化して、useWorkURLSync の依存関係による再実行を抑制します
   */
  const handleIdFound = useCallback((work: Work) => {
    setSelectedWork(work);
  }, []);

  useWorkURLSync(filter, handleIdFound);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    ALL_WORKS.forEach((w: Work) => w.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, []);

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <header className="mb-12">
          <p className="text-sm font-black text-blue-600 mb-2">PORTFOLIO</p>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900">
            Works
          </h1>
        </header>

        <WorkSearchPanel
          searchQuery={filter.searchQuery}
          setSearchQuery={filter.setSearchQuery}
          selectedCategory={filter.selectedCategory}
          setSelectedCategory={filter.setSelectedCategory}
          selectedTags={filter.selectedTags}
          toggleTag={filter.toggleTag}
          clearFilters={filter.clearFilters}
          availableTags={availableTags}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filter.paginatedWorks.map((work: Work) => (
            <WorkCard
              key={work.id}
              work={work}
              onClick={(w) => setSelectedWork(w)}
            />
          ))}
        </div>

        <Pagination
          current={filter.currentPage}
          total={filter.totalPages}
          onPageChange={filter.setCurrentPage}
        />
      </div>

      {selectedWork && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedWork(null)}
          />
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8 md:p-12">
            <button
              onClick={() => setSelectedWork(null)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
            >
              <X size={24} />
            </button>

            <div className="flex gap-2 mb-4">
              {selectedWork.category.map((cat) => (
                <span
                  key={cat}
                  className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-2 py-1 rounded"
                >
                  {cat}
                </span>
              ))}
            </div>

            <h2 className="text-3xl font-black text-slate-900 mb-4">
              {selectedWork.title}
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              {selectedWork.summary}
            </p>

            <div className="space-y-6">
              <section>
                <h3 className="font-bold text-slate-900 mb-2">Description</h3>
                <p className="text-slate-600 leading-relaxed">
                  {selectedWork.description}
                </p>
              </section>

              <section>
                <h3 className="font-bold text-slate-900 mb-2">Tech Stack</h3>
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

              {selectedWork.url && selectedWork.disclosureLevel !== "NDA" && (
                <a
                  href={selectedWork.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all active:scale-95"
                >
                  Visit Project Site
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function WorksPage() {
  return (
    <Suspense
      fallback={<div className="pt-32 text-center">Loading Works...</div>}
    >
      <WorksContent />
    </Suspense>
  );
}
