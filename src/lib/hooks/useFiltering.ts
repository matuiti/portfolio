// src/hooks/gallery/useFiltering.ts
"use client";

import { useState, useMemo } from "react";
import type { Category } from "@/types/gallery/category";
import type { UIPart } from "@/types/gallery/ui-part";

export function useFiltering(allItems: UIPart[]) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 2;

  // 各カテゴリの件数カウント（採用担当者向け）
  const categoryCounts = useMemo(() => {
    const counts = allItems.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return { all: allItems.length, ...counts };
  }, [allItems]);

  // フィルタリング処理
  const { filteredItems, noResultsMessage } = useMemo(() => {
    let items = [...allItems];
    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory);
    }
    if (selectedTags.length > 0) {
      items = items.filter((item) =>
        selectedTags.every((tag) => item.tags.includes(tag))
      );
    }
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q)
      );
    }
    return {
      filteredItems: items,
      noResultsMessage:
        items.length === 0 ? "該当するアイテムがありません。" : "",
    };
  }, [allItems, selectedCategory, selectedTags, searchQuery]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage]);

  const resetPage = () => setCurrentPage(1);

  return {
    selectedCategory,
    setSelectedCategory: (cat: Category) => {
      setSelectedCategory(cat);
      resetPage();
    },
    selectedTags,
    setSelectedTags: (tags: string[]) => {
      setSelectedTags(tags);
      resetPage();
    },
    searchQuery,
    setSearchQuery: (q: string) => {
      setSearchQuery(q);
      resetPage();
    },
    currentPage,
    setCurrentPage,
    itemsPerPage,
    filteredItems,
    paginatedItems,
    totalPages,
    noResultsMessage,
    categoryCounts,
  };
}
