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
    currentPage, // 追加
    setSelectedCategory,
    setSelectedTags,
    setSearchQuery,
    setCurrentPage, // 追加
  } = filtering;

  // 1. URLから初期値を読み込む (初回マウント時のみ)
  useEffect(() => {
    const category = searchParams.get("category");
    const tags = searchParams.get("tags");
    const q = searchParams.get("q");
    const page = searchParams.get("page"); // 追加

    if (category) setSelectedCategory(category);
    if (tags) setSelectedTags(tags.split(","));
    if (q) setSearchQuery(q);
    if (page) setCurrentPage(Number(page)); // 追加
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    // 1ページ目のときはURLをスッキリさせるため page パラメータは出さない
    if (currentPage > 1) {
      params.set("page", currentPage.toString());
    }

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    router.replace(url, { scroll: false });
  }, [
    selectedCategory,
    selectedTags,
    searchQuery,
    currentPage,
    pathname,
    router,
  ]);
}
