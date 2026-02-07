// src/app/works/lib/hooks/useWorkURLSync.ts

"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useWorkFilter } from "./useWorkFilter";
import { WorkFilterCategory, Work } from "@/types/work";
import { ALL_WORKS } from "@/data/works";

type WorkFilterReturn = ReturnType<typeof useWorkFilter>;

const isValidCategory = (cat: string | null): cat is WorkFilterCategory => {
  const validCategories: WorkFilterCategory[] = ["all", "web", "app", "game"];
  return validCategories.includes(cat as WorkFilterCategory);
};

export function useWorkURLSync(
  filter: WorkFilterReturn,
  onIdFound?: (work: Work) => void,
) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isInitialSync = useRef(true);

  // 1. URLパラメータからステートを復元
  useEffect(() => {
    const category = searchParams.get("category");
    const tags = searchParams.get("tags");
    const query = searchParams.get("q");
    const page = searchParams.get("page");
    const id = searchParams.get("id");

    if (category && isValidCategory(category)) {
      if (category !== filter.selectedCategory) {
        filter.setSelectedCategory(category);
      }
    }

    if (tags) {
      const tagArray = tags.split(",");
      if (JSON.stringify(tagArray) !== JSON.stringify(filter.selectedTags)) {
        filter.setSelectedTags(tagArray);
      }
    } else if (filter.selectedTags.length > 0 && isInitialSync.current) {
      filter.setSelectedTags([]);
    }

    if (query !== null && query !== filter.searchQuery) {
      filter.setSearchQuery(query);
    }

    if (page) {
      const pageNum = Number(page);
      if (pageNum !== filter.currentPage) {
        filter.setCurrentPage(pageNum);
      }
    }

    // IDによる詳細表示の同期
    if (id && onIdFound && isInitialSync.current) {
      const work = ALL_WORKS.find((w) => w.id === id);
      if (work) {
        onIdFound(work);
      }
    }

    isInitialSync.current = false;
    // 依存配列に filter と onIdFound を追加
  }, [searchParams, filter, onIdFound]);

  // 2. ステート変更をURLに反映
  useEffect(() => {
    if (isInitialSync.current) return;

    const params = new URLSearchParams();
    if (filter.selectedCategory && filter.selectedCategory !== "all") {
      params.set("category", filter.selectedCategory);
    }
    if (filter.selectedTags.length > 0) {
      params.set("tags", filter.selectedTags.join(","));
    }
    if (filter.searchQuery) {
      params.set("q", filter.searchQuery);
    }
    if (filter.currentPage > 1) {
      params.set("page", filter.currentPage.toString());
    }

    const queryString = params.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(url, { scroll: false });
  }, [
    filter.selectedCategory,
    filter.selectedTags,
    filter.searchQuery,
    filter.currentPage,
    pathname,
    router,
  ]);
}
