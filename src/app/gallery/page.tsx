"use client";

import { useFiltering } from "@/lib/hooks/useFiltering";
import { TitleAndCount } from "./components/ui/TitleAndCount";
import { UI_PARTS } from "@/data/gallery/ui-parts";
import { CategoryList } from "./components/filter/CategoryList";
import { GalleryLayout } from "./components/layout/GalleryLayout";
import { ItemList } from "./components/list/ItemList";
// import { Pagination } from "./components/list/Pagination";

export default function GalleryPage() {
  // ★ useFiltering の結果を filtering としてまとめて保持
  const filtering = useFiltering(UI_PARTS);

  // ★ filtering から必要な値を取り出す
  const {
    selectedCategory,
    selectedTags,
    searchQuery,
    currentPage,
    totalPages,
    paginatedItems,

    setSelectedCategory,
    setSelectedTags,
    setSearchQuery,
    setCurrentPage,
  } = filtering;

  return (
    <GalleryLayout filtering={filtering}>
      <div className="space-y-6">
        <TitleAndCount />

        {/* カテゴリ */}
        <CategoryList
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />

        {/* タグUI（後で実装） */}
        {/* <TagGroup selected={selectedTags} onChange={setSelectedTags} /> */}

        {/* 検索UI（後で実装） */}
        {/* <SearchBox value={searchQuery} onChange={setSearchQuery} /> */}

        {/* 一覧 */}
        <ItemList />

        {/* ページネーション */}
        {/* <Pagination current={currentPage} total={totalPages} onChange={setCurrentPage} /> */}
      </div>
    </GalleryLayout>
  );
}
