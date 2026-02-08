// src/app/gallery/components/layout/GalleryDrawerMenu.tsx

"use client";

import { useUIStore } from "@/store/useUIStore";
import { CategoryList } from "../filter/CategoryList";
import { TagFilters } from "../filter/TagFilters";
import { SearchBox } from "../filter/SearchBox";
import { Filtering } from "@/gallery/types/filtering";

type Props = {
  filtering: Filtering;
  isOpen: boolean;
  onClose: () => void;
};

export function GalleryDrawerMenu({ filtering, isOpen, onClose }: Props) {
  // Zustandストアから検索ドロワーを閉じるための関数を取得
  const { setSearchDrawerOpen } = useUIStore();

  const {
    selectedCategory,
    selectedTags,
    searchQuery,
    categoryCounts,
    filteredItems,
    setSelectedCategory,
    setSelectedTags,
    setSearchQuery,
    clearFilters,
  } = filtering;

  // ドロワーを閉じる際、グローバル状態も更新する
  const handleClose = () => {
    setSearchDrawerOpen(false);
    onClose();
  };

  return (
    <>
      {/* オーバーレイ: クリックでドロワーを閉じる */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* ドロワー本体 */}
      <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-labelledby="sp-search-panel-title"
      >
        {/* --- ヘッダーエリア (固定) --- */}
        <div className="p-6 flex items-center justify-between border-b border-neutral-100">
          <div>
            <h2
              id="sp-search-panel-title"
              className="font-bold text-neutral-800"
            >
              検索パネル
            </h2>
            <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
              ヒット：{filteredItems.length} 件
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-neutral-50 text-neutral-400 text-2xl hover:bg-neutral-100 transition-colors"
            aria-label="閉じる"
          >
            ×
          </button>
        </div>

        {/* --- コンテンツエリア (スクロール可能) --- */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          {/* キーワード検索セクション */}
          <section className="space-y-3">
            <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-1">
              Keyword
            </h3>
            <SearchBox value={searchQuery} onChange={setSearchQuery} />
            <button
              onClick={clearFilters}
              className="w-full py-2.5 bg-neutral-100 text-neutral-600 rounded-xl text-xs font-bold active:bg-neutral-200 transition-colors"
            >
              フィルターをリセット
            </button>
          </section>

          {/* カテゴリ選択セクション */}
          <section className="space-y-3">
            <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-1">
              Category
            </h3>
            <CategoryList
              selected={selectedCategory}
              onChange={setSelectedCategory}
              counts={categoryCounts}
            />
          </section>

          {/* タグ選択セクション */}
          <section className="space-y-3">
            <h3 className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest px-1">
              Tags
            </h3>
            <TagFilters
              selectedTags={selectedTags}
              onChange={setSelectedTags}
            />
          </section>
        </div>
      </aside>
    </>
  );
}
