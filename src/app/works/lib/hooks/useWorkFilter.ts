"use client";

import { useState, useMemo, useCallback } from "react";
import { Work, WorkFilterCategory } from "@/types/work";

/**
 * 作品一覧のフィルタリングを管理するカスタムフック
 * @param allWorks 作品データの配列（デフォルトは空配列）
 */
export function useWorkFilter(allWorks: Work[] = []) {
  const [selectedCategory, setSelectedCategory] =
    useState<WorkFilterCategory>("all");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // サイドバーなどで使用する既存の「追加・削除」トグル
  const toggleTag = useCallback((tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
    setCurrentPage(1);
  }, []);

  // 【新規】他のフィルターをすべてリセットして、そのタグのみで検索する
  const selectOnlyTag = useCallback((tag: string) => {
    setSearchQuery(""); // キーワードをクリア
    setSelectedCategory("all"); // カテゴリーを「すべて」にリセット
    setSelectedTags([tag]); // 指定されたタグのみを選択
    setCurrentPage(1); // 1ページ目に戻す
  }, []);

  // 【新規】他のフィルターをすべてリセットして、そのカテゴリーのみで検索する
  const selectOnlyCategory = useCallback((cat: WorkFilterCategory) => {
    setSearchQuery(""); // キーワードをクリア
    setSelectedTags([]); // すべてのタグをクリア
    setSelectedCategory(cat); // 指定されたカテゴリーのみを選択
    setCurrentPage(1); // 1ページ目に戻す
  }, []);

  const clearFilters = useCallback(() => {
    setSelectedCategory("all");
    setSelectedTags([]);
    setSearchQuery("");
    setCurrentPage(1);
  }, []);

  // フィルタリング処理の実行
  const filteredWorks = useMemo(() => {
    // 安全装置: allWorksが配列でない場合は空配列を返す
    if (!Array.isArray(allWorks)) return [];

    return allWorks.filter((work) => {
      const matchCategory =
        selectedCategory === "all" || work.category.includes(selectedCategory);
      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => work.tags.includes(tag));
      const matchQuery =
        searchQuery === "" ||
        work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        work.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      return matchCategory && matchTags && matchQuery;
    });
  }, [allWorks, selectedCategory, selectedTags, searchQuery]);

  // 利用可能な全タグの抽出
  const availableTags = useMemo(() => {
    if (!Array.isArray(allWorks)) return [];
    const tags = new Set<string>();
    allWorks.forEach((work) => work.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, [allWorks]);

  return {
    filteredWorks,
    selectedCategory,
    selectedTags,
    searchQuery,
    currentPage,
    availableTags,
    setSelectedCategory,
    setSearchQuery,
    setCurrentPage,
    toggleTag,
    selectOnlyTag, // 追加
    selectOnlyCategory, // 追加
    clearFilters,
  };
}
