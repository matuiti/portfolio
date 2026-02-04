// src/lib/hooks/useFilter.ts
"use client";

import { useState, useMemo, useCallback } from "react";

export function useFilter<T>(
  initialItems: T[],
  // フィルタリングのロジックを外部から注入できるようにします
  filterLogic: (item: T, category: string, selectedTags: string[]) => boolean,
) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // カテゴリ選択の切り替え
  const toggleCategory = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  // タグ選択の切り替え（クリックするたびに追加/削除）
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }, []);

  // フィルタのリセット
  const clearFilters = useCallback(() => {
    setSelectedCategory("all");
    setSelectedTags([]);
  }, []);

  // フィルタリングの実行
  const filteredItems = useMemo(() => {
    return initialItems.filter((item) =>
      filterLogic(item, selectedCategory, selectedTags),
    );
  }, [initialItems, selectedCategory, selectedTags, filterLogic]);

  return {
    filteredItems,
    selectedCategory,
    selectedTags,
    toggleCategory,
    toggleTag,
    clearFilters,
  };
}
