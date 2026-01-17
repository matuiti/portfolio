"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Filtering } from "@/types/gallery/filtering";

export function useURLSync(filtering: Filtering) {
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
  } = filtering;

  // 1. URLから初期値を読み込む (初回マウント時のみ)
  useEffect(() => {
    const category = searchParams.get("category");
    const tags = searchParams.get("tags");
    const q = searchParams.get("q");

    if (category) setSelectedCategory(category);
    if (tags) setSelectedTags(tags.split(","));
    if (q) setSearchQuery(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // 初期化時のみ実行

  // 2. Stateの変化をURLに反映する
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedCategory && selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }

    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }

    if (searchQuery) {
      params.set("q", searchQuery);
    }

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    // URLを更新 (履歴に残さない場合は .replace、残す場合は .push)
    // フィルター操作は履歴が溜まりすぎないよう replace が好まれます
    router.replace(url, { scroll: false });
  }, [selectedCategory, selectedTags, searchQuery, pathname, router]);
}
