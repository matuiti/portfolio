// src/app/works/lib/hooks/useWorkURLSync.ts
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { WorkFilterCategory } from "@/types/work";

// 引数の型を厳格に定義 [cite: 85, 217]
type FilterActions = {
  selectedCategory: WorkFilterCategory;
  selectedTags: string[];
  searchQuery: string;
  setSelectedCategory: (cat: WorkFilterCategory) => void;
  setSelectedTags: (tags: string[]) => void;
  setSearchQuery: (q: string) => void;
};

export function useWorkURLSync(actions: FilterActions) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    selectedCategory,
    selectedTags,
    searchQuery,
    setSelectedCategory,
    setSelectedTags,
    setSearchQuery,
  } = actions;

  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // 1. 初期ロード時：URLパラメータをStateに反映 [cite: 181, 217, 218]
  useEffect(() => {
    const cat = searchParams.get("category");
    const tags = searchParams.get("tags");
    const q = searchParams.get("q");

    if (cat) setSelectedCategory(cat as WorkFilterCategory);
    if (tags) setSelectedTags(tags.split(",").filter((t) => t !== ""));
    if (q) setSearchQuery(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. キーワード入力のデバウンス処理 [cite: 182, 218, 219]
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // 3. Stateの変化をURLパラメータに書き込む [cite: 182, 183, 219, 220]
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory !== "all") params.set("category", selectedCategory);
    if (selectedTags.length > 0) params.set("tags", selectedTags.join(","));
    if (debouncedQuery) params.set("q", debouncedQuery);

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    router.replace(url, { scroll: false });
  }, [selectedCategory, selectedTags, debouncedQuery, pathname, router]);
}
