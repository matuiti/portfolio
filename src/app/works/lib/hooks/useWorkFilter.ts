"use client";

import { useState, useMemo, useCallback } from "react";
import { ALL_WORKS } from "@/data/works";
import { Work, WorkFilterCategory, WorkCategory } from "@/types/work";

export function useWorkFilter(limit?: number) {
  // ステートに適切なリテラル型を指定し、"any" を回避します
  const [selectedCategory, setSelectedCategory] =
    useState<WorkFilterCategory>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  // 全データからユニークなタグ一覧を抽出 [cite: 18]
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    ALL_WORKS.forEach((work) => {
      work.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, []);

  // フィルタリング実行 [cite: 19, 20]
  const filteredWorks = useMemo(() => {
    return ALL_WORKS.filter((work: Work) => {
      const matchCategory =
        selectedCategory === "all" ||
        work.category.includes(selectedCategory as WorkCategory);

      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => work.tags.includes(tag));

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        q === "" ||
        work.title.toLowerCase().includes(q) ||
        work.summary.toLowerCase().includes(q) ||
        work.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchCategory && matchTags && matchQuery;
    });
  }, [selectedCategory, selectedTags, searchQuery]);

  // ページネーション [cite: 20]
  const paginatedWorks = useMemo(() => {
    if (limit) return filteredWorks.slice(0, limit);
    const maxPage = Math.ceil(filteredWorks.length / itemsPerPage) || 1;
    const safePage = Math.min(currentPage, maxPage);
    const startIndex = (safePage - 1) * itemsPerPage;
    return filteredWorks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredWorks, currentPage, limit]);

  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);

  // ハンドラー
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) => {
      const next = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];
      setCurrentPage(1);
      return next;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategory("all");
    setSelectedTags([]);
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  const handleSetCategory = useCallback((cat: WorkFilterCategory) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  }, []);

  return {
    selectedCategory,
    selectedTags,
    searchQuery,
    currentPage,
    filteredWorks,
    paginatedWorks,
    totalPages,
    availableTags, // ここで返却
    setSelectedCategory: handleSetCategory,
    setSearchQuery,
    toggleTag,
    clearFilters,
    setCurrentPage,
  };
}
