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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // -----------------------------
  // フィルタリング処理（段階的に計算）
  // -----------------------------
  const { filteredItems, noResultsMessage } = useMemo(() => {
    let items = [...allItems];

    // 1. カテゴリ絞り込み
    if (selectedCategory !== "all") {
      const categoryFiltered = items.filter(
        (item) => item.category === selectedCategory
      );
      if (categoryFiltered.length === 0) {
        return {
          filteredItems: [],
          noResultsMessage: "指定されたカテゴリのアイテムはまだありません。",
        };
      }
      items = categoryFiltered;
    }

    // 2. タグ絞り込み (AND検索)
    if (selectedTags.length > 0) {
      const tagFiltered = items.filter((item) =>
        selectedTags.every((tag) => item.tags.includes(tag))
      );
      if (tagFiltered.length === 0) {
        return {
          filteredItems: [],
          noResultsMessage:
            "選択されたタグの組み合わせに一致するアイテムはありません。",
        };
      }
      items = tagFiltered;
    }

    // 3. 検索キーワード絞り込み
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const searchFiltered = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
      if (searchFiltered.length === 0) {
        return {
          filteredItems: [],
          noResultsMessage: `「${searchQuery}」に一致する結果は見つかりませんでした。`,
        };
      }
      items = searchFiltered;
    }

    return { filteredItems: items, noResultsMessage: "" };
  }, [allItems, selectedCategory, selectedTags, searchQuery]);

  // -----------------------------
  // ページネーション
  // -----------------------------
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  const resetPage = () => setCurrentPage(1);

  return {
    selectedCategory,
    selectedTags,
    searchQuery,
    currentPage,
    itemsPerPage,
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
    filteredItems,
    paginatedItems,
    totalPages,
    noResultsMessage
  };
}