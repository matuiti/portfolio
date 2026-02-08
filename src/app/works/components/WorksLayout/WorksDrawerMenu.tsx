// src/app/works/components/WorksLayout/WorksDrawerMenu.tsx

"use client";

import { useWorkStore, useFilteredWorks } from "@/store/useWorkStore";
import { useUIStore } from "@/store/useUIStore"; // 追加
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
  // Zustandストアから検索ドロワーを閉じるアクションを取得
  const { setSearchDrawerOpen } = useUIStore();

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

  // 閉じる処理の共通化
  const handleClose = () => {
    setSearchDrawerOpen(false);
    onClose();
  };

  return (
    <>
      {/* オーバーレイ: 背景をクリックして閉じる */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* ドロワー本体 */}
      <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ヘッダーセクション */}
        <div className="p-6 flex items-center justify-between border-b border-slate-100">
          <div>
            <h2 className="font-bold text-slate-900">検索パネル</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              ヒット：{filteredWorks.length} 件
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 transition-colors"
            aria-label="閉じる"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* コンテンツセクション（スクロール可能） */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* キーワード */}
          <section className="space-y-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
              Keyword
            </h3>
            <WorksSearchBox value={searchQuery} onChange={setSearchQuery} />
            <button
              onClick={clearFilters}
              className="w-full py-3 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold active:bg-slate-200 transition-colors"
            >
              フィルターをリセット
            </button>
          </section>

          {/* カテゴリ */}
          <section className="space-y-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
              Category
            </h3>
            <WorksCategoryList
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </section>

          {/* タグ */}
          <section className="space-y-3">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
              Tags
            </h3>
            <WorksTagFilters
              selectedTags={selectedTags}
              onChange={setSelectedTags}
            />
          </section>
        </div>
      </aside>
    </>
  );
}
