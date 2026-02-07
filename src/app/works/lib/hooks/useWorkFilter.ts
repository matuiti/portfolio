"use client";

import { useState, useMemo, useCallback } from "react";
import { ALL_WORKS } from "@/data/works";
import { Work, WorkFilterCategory, WorkCategory } from "@/types/work";

export function useWorkFilter(limit?: number) {
  const [selectedCategory, setSelectedCategory] =
    useState<WorkFilterCategory>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // ページ管理用のステート
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // --- 修正のポイント: useEffectを使わない ---
  // 検索条件を一つの文字列にまとめて、以前の条件と比較するための仕組みを作ることもできますが、
  // 最もシンプルで確実な方法は、各setter関数をラップして「変更時にページをリセットする」ことです。

  const handleSetCategory = useCallback((cat: WorkFilterCategory) => {
    setSelectedCategory(cat);
    setCurrentPage(1); // 変更と同時にリセット
  }, []);

  const handleSetTags = useCallback((tags: string[]) => {
    setSelectedTags(tags);
    setCurrentPage(1); // 変更と同時にリセット
  }, []);

  const handleSetSearchQuery = useCallback((q: string) => {
    setSearchQuery(q);
    setCurrentPage(1); // 変更と同時にリセット
  }, []);

  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) => {
      const next = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];
      setCurrentPage(1); // 変更と同時にリセット
      return next;
    });
  }, []);

  // カテゴリごとの件数算出
  const categoryCounts = useMemo(() => {
    const counts = ALL_WORKS.reduce(
      (acc, work) => {
        work.category.forEach((cat: WorkCategory) => {
          acc[cat] = (acc[cat] || 0) + 1;
        });
        return acc;
      },
      {} as Record<string, number>,
    );
    return { all: ALL_WORKS.length, ...counts };
  }, []);

  // 1. フィルタリング実行
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

  // 2. ページネーション実行
  const paginatedWorks = useMemo(() => {
    if (limit) return filteredWorks.slice(0, limit);

    // 現在のフィルタ結果に対して、指定したページ番号が範囲外にならないよう調整
    const maxPage = Math.ceil(filteredWorks.length / itemsPerPage) || 1;
    const safePage = Math.min(currentPage, maxPage);

    const startIndex = (safePage - 1) * itemsPerPage;
    return filteredWorks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredWorks, currentPage, limit]);

  const totalPages = Math.ceil(filteredWorks.length / itemsPerPage);

  const clearFilters = useCallback(() => {
    setSelectedCategory("all");
    setSelectedTags([]);
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  return {
    selectedCategory,
    selectedTags,
    searchQuery,
    currentPage,
    totalPages,
    filteredWorks,
    paginatedWorks,
    categoryCounts,
    totalCount: ALL_WORKS.length,

    // Actions: ページリセットロジックを含んだ関数を返す
    setSelectedCategory: handleSetCategory,
    toggleCategory: handleSetCategory,
    setSelectedTags: handleSetTags,
    setSearchQuery: handleSetSearchQuery,
    setCurrentPage,
    clearFilters,
    toggleTag,
  };
}
