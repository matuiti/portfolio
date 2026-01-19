// 3.
// SP のUI検索ナビゲーション。

"use client";

import { Filtering } from "@/types/gallery/filtering";
import { CategoryList } from "../filter/CategoryList";
import { TagFilters } from "../filter/TagFilters";
import { SearchBox } from "../filter/SearchBox";

type Props = {
  filtering: Filtering;
  isOpen: boolean;
  onClose: () => void;
};

export function GalleryDrawerMenu({ filtering, isOpen, onClose }: Props) {
  const {
    selectedCategory,
    selectedTags,
    searchQuery,
    setSelectedCategory,
    setSelectedTags,
    setSearchQuery,
  } = filtering;

  return (
    <>
      {/* オーバーレイ（背景）: アニメーションを滑らかにするため opacity を制御 */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* ドロワー本体 */}
      <div
        className={`fixed top-0 left-0 h-full w-[85%] max-w-[320px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ヘッダー: 閉じるボタンを大きく、押しやすく */}
        <div className="p-4 flex items-center justify-between border-b sticky top-0 bg-white z-10">
          <div>
            <h2 className="inline-block font-bold text-neutral-800 mr-2">
              検索パネル
            </h2>
            <span className="text-[10px] text-neutral-400 font-medium tracking-tight">
              検索結果：{filtering.filteredItems.length} 件
            </span>
            <button
              onClick={filtering.clearFilters}
              className="ml-2 mt-6 px-6 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-full text-xs font-bold transition-colors"
            >
              フィルターをリセット
            </button>
            {/* キーワード検索 */}
            <section className="space-y-2">
              <h3 className="text-xs font-bold text-neutral-400 uppercase px-1">
                Search
              </h3>
              <SearchBox value={searchQuery} onChange={setSearchQuery} />
            </section>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 active:bg-neutral-200 transition-colors"
            aria-label="Close menu"
          >
            <span className="text-2xl text-neutral-500">×</span>
          </button>
        </div>

        {/* コンテンツエリア: スクロール可能にする */}
        <div className="flex-1 overflow-y-auto p-4 space-y-8 pb-20">
          {/* 2. カテゴリ選択 */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-neutral-400 uppercase px-1">
              Category
            </h3>
            <CategoryList
              selected={selectedCategory}
              onChange={setSelectedCategory}
              counts={filtering.categoryCounts}
            />
          </section>

          {/* 3. タグフィルタ */}
          <section className="space-y-2">
            <h3 className="text-xs font-bold text-neutral-400 uppercase px-1">
              Tags
            </h3>
            <TagFilters
              selectedTags={selectedTags}
              onChange={setSelectedTags}
            />
          </section>
        </div>
      </div>
    </>
  );
}
