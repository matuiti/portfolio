// フィルタリングの流れ（ロジック）
// - カテゴリで絞る
// - タグで絞る
// - 検索ワードで絞る
// - ページネーションで分割する

"use client";

import { useState, useMemo } from "react";
import type { UIPart } from "@/types/gallery/ui-part";
import { Filtering } from "@/types/gallery/filtering";

export function useFiltering(allItems: UIPart[]): Filtering {
  // -----------------------------
  // 状態
  // -----------------------------
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // -----------------------------
  // フィルタリング処理
  // -----------------------------
  const filteredItems = useMemo(() => {
    let items = [...allItems];

    // カテゴリ
    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // タグ
    if (selectedTags.length > 0) {
      items = items.filter((item) =>
        selectedTags.every((tag) => item.tags.includes(tag))
      );
    }

    // 検索
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }

    return items;
  }, [allItems, selectedCategory, selectedTags, searchQuery]);

  // -----------------------------
  // ページネーション
  // -----------------------------
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  // -----------------------------
  // ページ変更時のリセット
  // -----------------------------
  const resetPage = () => setCurrentPage(1);

  return {
    // state
    selectedCategory,
    selectedTags,
    searchQuery,
    currentPage,
    itemsPerPage,

    // setters
    setSelectedCategory: (cat: string) => {
      setSelectedCategory(cat);
      resetPage();
    },
    setSelectedTags: (tags: string[]) => {
      setSelectedTags(tags);
      resetPage();
    },
    setSearchQuery: (q: string) => {
      setSearchQuery(q);
      resetPage();
    },
    setCurrentPage,

    // 結果
    filteredItems,
    paginatedItems,
    totalPages,
  };
}
