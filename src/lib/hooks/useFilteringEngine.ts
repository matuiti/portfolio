// src/lib/hooks/useFilteringEngine.ts
"use client";

import { FilterableItem, FilterState } from "@/types/filtering";
import { useMemo } from "react";

/**
 * 汎用フィルタリング・エンジン
 * 共通仕様書 [1] に基づく標準評価アルゴリズムを実装。
 */
export function useFilteringEngine<T extends FilterableItem>(
  items: T[],
  state: FilterState,
) {
  const filteredItems = useMemo(() => {
    const { category, tags, searchQuery } = state;
    const query = searchQuery.trim().toLowerCase();

    return items.filter((item) => {
      // 1. カテゴリ抽出 (完全一致または包含) [1]
      const matchCategory =
        category === "all" ||
        (Array.isArray(item.category)
          ? item.category.includes(category)
          : item.category === category);

      if (!matchCategory) return false;

      // 2. タグ抽出 (AND検索: 選択タグをすべて含むか) [1]
      const matchTags =
        tags.length === 0 || tags.every((tag) => item.tags.includes(tag));

      if (!matchTags) return false;

      // 3. キーワード抽出 (部分一致: タイトル/説明/タグ) [1]
      const matchQuery =
        query === "" ||
        item.title.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query) ||
        item.tags.some((tag) => tag.toLowerCase().includes(query));

      return matchQuery;
    });
  }, [items, state]);

  return filteredItems;
}
