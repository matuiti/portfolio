// src/app/works/lib/hooks/useWorkFilter.ts
import { useCallback } from "react";
import { useFilter } from "@/lib/hooks/useFilter";
import { ALL_WORKS } from "@/data/works";
import { Work } from "@/types/work";

export const useWorkFilter = (limit?: number) => {
  // WORKS用の絞り込みロジックを定義
  const workFilterLogic = useCallback(
    (work: Work, category: string, tags: string[]) => {
      // 1. カテゴリのチェック
      const matchCategory = category === "all" || work.category === category;

      // 2. タグのチェック (選択されたタグが全て含まれているか：AND検索)
      const matchTags =
        tags.length === 0 || tags.every((tag) => work.tags.includes(tag));

      return matchCategory && matchTags;
    },
    [],
  );

  const {
    filteredItems,
    selectedCategory,
    selectedTags,
    toggleCategory,
    toggleTag,
    clearFilters,
  } = useFilter<Work>(ALL_WORKS, workFilterLogic);

  // トップページなどの件数制限用
  const displayWorks = limit ? filteredItems.slice(0, limit) : filteredItems;

  return {
    displayWorks,
    selectedCategory,
    selectedTags,
    toggleCategory,
    toggleTag,
    clearFilters,
    totalCount: ALL_WORKS.length,
    filteredCount: filteredItems.length,
  };
};
