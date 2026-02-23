// src/app/works/components/WorksLayout/WorksSidebar.tsx
"use client";

import { useWorkStore, useFilteredWorks } from "@/store/useWorkStore";
import {
  WorksSearchBox,
  WorksCategoryList,
  WorksTagFilters,
} from "./FilterParts";

export function WorksSidebar() {
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
    <aside className="hidden lg:block w-80 shrink-0">
      <div className="sticky top-24 h-[calc(100vh-120px)] bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        {/* メニューヘッダ（固定）エリア */}
        <div className="p-8 pb-4 border-b border-slate-50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              検索パネル
            </h2>
            <span className="bg-blue-50 text-blue-600 text-[10px] font-black px-2.5 py-1 rounded-full">
              {filteredWorks.length} 件
            </span>
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
              className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-all active:scale-[0.98]"
            >
              フィルターをリセット
            </button>
          </div>
        </div>

        {/* コンテンツエリア（スクロール可） */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 pt-6 space-y-8">
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
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Tags
              </h3>
              {selectedTags.length > 0 && (
                <button
                  onClick={() => setSelectedTags([])}
                  className="text-[10px] text-blue-600 hover:underline"
                >
                  リセット
                </button>
              )}
            </div>
            <WorksTagFilters
              selectedTags={selectedTags}
              onChange={setSelectedTags}
            />
          </section>
        </div>
      </div>
    </aside>
  );
}
