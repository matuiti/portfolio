"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Filtering } from "@/types/gallery/filtering";
import { Category } from "@/types/gallery/category";
import { CATEGORIES } from "@/data/gallery/categories";

export function useURLSync(filtering: Filtering) {
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

  // 提案2：検索クエリのデバウンス用State
  // UI上のsearchQueryとは別に、URL反映用の値を管理します
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // 1. URLから初期値を読み込む (初回マウント時)
  useEffect(() => {
    const category = searchParams.get("category");
    const tags = searchParams.get("tags");
    const q = searchParams.get("q");
    const page = searchParams.get("page");

    if (category) {
      const isValid = CATEGORIES.some((c) => c.id === category);
      if (isValid) setSelectedCategory(category as Category);
    }

    // 提案1：空文字ガード付きのタグ読み込み
    if (tags) {
      const tagList = tags.split(",").filter((t) => t !== "");
      if (tagList.length > 0) setSelectedTags(tagList);
    }

    if (q) setSearchQuery(q);
    if (page) setCurrentPage(Number(page));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 提案2：デバウンス処理
  // 入力が止まってから300ms後にURL反映用のStateを更新
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 2. Stateの変化をURLに反映する
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }
    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }
    // デバウンスされた値を使用してURLを更新
    if (debouncedSearchQuery) {
      params.set("q", debouncedSearchQuery);
    }
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    router.replace(url, { scroll: false });

  }, [
    selectedCategory,
    selectedTags,
    debouncedSearchQuery, // ここをsearchQueryではなくデバウンス版にする
    currentPage,
    pathname,
    router,
  ]);
}
