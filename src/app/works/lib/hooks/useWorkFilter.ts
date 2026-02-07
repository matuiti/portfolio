"use client";

import { useState, useMemo, useCallback } from "react";
import { ALL_WORKS } from "@/data/works";
import { Work, WorkFilterCategory, WorkCategory } from "@/types/work";

export function useWorkFilter(limit?: number) {
  const [selectedCategory, setSelectedCategory] =
    useState<WorkFilterCategory>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  // フィルタリング実行
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

  // トップページ互換性のためのデータ作成 [cite: 6]
  const displayWorks = limit ? filteredWorks.slice(0, limit) : filteredWorks;

  const clearFilters = useCallback(() => {
    setSelectedCategory("all");
    setSelectedTags([]);
    setSearchQuery("");
  }, []);

  return {
    // States
    selectedCategory,
    selectedTags,
    searchQuery,
    filteredWorks, // 全結果（WORKSページ用）
    displayWorks, // 制限あり（トップページ用） [cite: 6]
    categoryCounts,
    totalCount: ALL_WORKS.length,

    // Actions (トップページ互換のため toggleCategory も残す)
    setSelectedCategory,
    toggleCategory: (cat: WorkFilterCategory) => setSelectedCategory(cat),
    setSelectedTags,
    setSearchQuery,
    clearFilters,
    toggleTag: (tag: string) => {
      setSelectedTags((prev) =>
        prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
      );
    },
  };
}
