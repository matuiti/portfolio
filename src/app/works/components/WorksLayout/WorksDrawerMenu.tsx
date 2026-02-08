// src/app/works/components/WorksLayout/WorksDrawerMenu.tsx
"use client";

import { useWorkStore, useFilteredWorks } from "@/store/useWorkStore";
import { X } from "lucide-react";
import {
  WorksSearchBox,
  WorksCategoryList,
  WorksTagFilters,
} from "./FilterParts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function WorksDrawerMenu({ isOpen, onClose }: Props) {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    setSelectedTags,
    clearFilters,
  } = useWorkStore();

  const filteredWorks = useFilteredWorks();

  return (
    <>
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-slate-50">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">検索パネル</h2>
              <p className="text-[10px] font-black text-blue-600">
                ヒット：{filteredWorks.length} 件
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <section>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-1">
                Keyword
              </h3>
              <WorksSearchBox value={searchQuery} onChange={setSearchQuery} />
            </section>
            <button
              onClick={clearFilters}
              className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
            >
              フィルターをリセット
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <section>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
              Category
            </h3>
            <WorksCategoryList
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </section>
          <section>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 px-1">
              Tags
            </h3>
            <WorksTagFilters
              selectedTags={selectedTags}
              onChange={setSelectedTags}
            />
          </section>
        </div>
      </div>
    </>
  );
}
