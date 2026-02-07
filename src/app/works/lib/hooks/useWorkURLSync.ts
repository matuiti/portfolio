// src/app/works/lib/hooks/useWorkURLSync.ts

"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { WorkFilterCategory } from "@/types/work";

// useWorkFilterの戻り値の型（必要に応じて調整）
type WorkFiltering = {
  selectedCategory: WorkFilterCategory;
  selectedTags: string[];
  searchQuery: string;
  currentPage: number;
  setSelectedCategory: (cat: WorkFilterCategory) => void;
  setSelectedTags: (tags: string[]) => void;
  setSearchQuery: (q: string) => void;
  setCurrentPage: (page: number) => void;
};

export function useWorkURLSync(filtering: WorkFiltering) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    selectedCategory,
    selectedTags,
    searchQuery,
    currentPage,
    setSelectedCategory,
    setSelectedTags,
    setSearchQuery,
    setCurrentPage,
  } = filtering;

  // 【対策】検索クエリのデバウンス用State
  // UI上の searchQuery とは別に、URL反映用の値を管理します
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // 1. URLから初期値を読み込む (初回マウント時)
  useEffect(() => {
    const category = searchParams.get("category");
    const tags = searchParams.get("tags");
    const q = searchParams.get("q");
    const page = searchParams.get("page");

    if (category) {
      setSelectedCategory(category as WorkFilterCategory);
    }

    if (tags) {
      const tagList = tags.split(",").filter((t) => t !== "");
      if (tagList.length > 0) setSelectedTags(tagList);
    }

    if (q) setSearchQuery(q);
    if (page) setCurrentPage(Number(page));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. 【重要】デバウンス処理
  // 入力が止まってから300ms後にのみURL反映用のStateを更新する
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300); // 300ms待機

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 3. 各Stateの変化をURLに反映する
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }

    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }

    // 生の searchQuery ではなく、デバウンスされた値を使用してURLを更新
    if (debouncedSearchQuery) {
      params.set("q", debouncedSearchQuery);
    }

    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    // URLを書き換える（scroll: false で位置を保持し、再レンダリングの影響を抑える）
    router.replace(url, { scroll: false });
  }, [
    selectedCategory,
    selectedTags,
    debouncedSearchQuery, // 依存配列をデバウンス版にする
    currentPage,
    pathname,
    router,
  ]);
}