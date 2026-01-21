// src/hooks/gallery/useFiltering.ts
"use client";

import { useState, useMemo } from "react";
import type { Category } from "@/types/gallery/category";
import type { UIPart } from "@/types/gallery/ui-part";
import type { Filtering } from "@/types/gallery/filtering";
import { CATEGORIES } from "@/data/gallery/categories";
import { GALLERY_SETTINGS } from "@/lib/constants/gallery";

export function useFiltering(allItems: UIPart[]): Filtering {
  const [selectedItem, setSelectedItem] = useState<UIPart | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category>(GALLERY_SETTINGS.DEFAULT_CATEGORY);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = GALLERY_SETTINGS.ITEMS_PER_PAGE;

  // ヘルパー：状態変更時にページを1に戻す
  const resetPage = () => setCurrentPage(1);

  // 1. 各カテゴリの件数カウント
  const categoryCounts = useMemo(() => {
    const counts = allItems.reduce(
      (acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    return { all: allItems.length, ...counts };
  }, [allItems]);

  // 2. フィルタリング処理
  const filteredItems = useMemo(() => {
    let items = [...allItems];

    // カテゴリ絞り込み
    if (selectedCategory !== "all") {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // タグ絞り込み
    if (selectedTags.length > 0) {
      items = items.filter((item) =>
        selectedTags.every((tag) => item.tags.includes(tag)),
      );
    }

    // 検索ワード絞り込み
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q),
      );
    }

    return items;
  }, [allItems, selectedCategory, selectedTags, searchQuery]);

  // 3. ページネーション計算
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  // 4. 表示用タイトルの確定（検索ワードがある場合は引用符で強調）
  const displayTitle = useMemo(() => {
    const label =
      CATEGORIES.find((c) => c.id === selectedCategory)?.label || "すべて";
    return searchQuery.trim() ? `${label} : "${searchQuery}"` : label;
  }, [selectedCategory, searchQuery]);

  // 5. 件数と状態フラグ
  const totalHitCount = filteredItems.length;
  const isEmpty = totalHitCount === 0;

  // 6. メッセージの動的生成
  const noResultsMessage = isEmpty
    ? searchQuery.trim() !== ""
      ? `"${searchQuery}" に一致するアイテムが見つかりませんでした。`
      : "該当するアイテムがありません。"
    : "";

  // すべての条件を初期状態に戻す関数
  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedTags([]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  return {
    // State
    selectedItem,
    selectedCategory,
    selectedTags,
    searchQuery,
    currentPage,
    itemsPerPage,
    totalPages,
    filteredItems,
    paginatedItems,
    noResultsMessage,
    categoryCounts,
    displayTitle,
    totalHitCount,
    isEmpty,
    
    // Actions
    clearFilters,
    setSelectedItem,
    setSelectedCategory: (cat: Category) => {
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
  };
}
