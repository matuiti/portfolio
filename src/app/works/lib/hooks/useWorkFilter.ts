// src/app/works/lib/hooks/useWorkFilter.ts
"use client";

import { useState, useMemo, useCallback } from "react";
import { ALL_WORKS } from "@/data/works";
import { Work, WorkFilterCategory, WorkCategory } from "@/types/work";

export function useWorkFilter() {
  // 1. 検索状態の管理（型を明示）
  const [selectedCategory, setSelectedCategory] =
    useState<WorkFilterCategory>("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // 2. 各カテゴリのヒット件数算出 [cite: 170, 207, 208]
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

    return { All: ALL_WORKS.length, ...counts };
  }, []);

  // 3. フィルタリング実行ロジック [cite: 171, 172, 208, 209]
  const filteredWorks = useMemo(() => {
    return ALL_WORKS.filter((work: Work) => {
      // カテゴリ一致判定 (Allの場合はスルー) [cite: 48, 105, 208]
      const matchCategory =
        selectedCategory === "All" ||
        work.category.includes(selectedCategory as WorkCategory);

      // タグ一致判定 (選択されたタグすべてを含んでいるか：AND検索) [cite: 48, 171, 208]
      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => work.tags.includes(tag));

      // キーワード検索 (タイトル、サマリー、タグから部分一致) [cite: 172, 208, 209]
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        q === "" ||
        work.displayTitle.toLowerCase().includes(q) ||
        work.summary.toLowerCase().includes(q) ||
        work.tags.some((tag) => tag.toLowerCase().includes(q));

      // すべての条件を満たすものを返す
      return matchCategory && matchTags && matchQuery;
    });
  }, [selectedCategory, selectedTags, searchQuery]);

  // 4. フィルタのリセット関数 [cite: 173, 174, 210, 211]
  const clearFilters = useCallback(() => {
    setSelectedCategory("All");
    setSelectedTags([]);
    setSearchQuery("");
  }, []);

  return {
    selectedCategory,
    selectedTags,
    searchQuery,
    filteredWorks,
    categoryCounts,
    totalCount: ALL_WORKS.length,
    setSelectedCategory,
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
