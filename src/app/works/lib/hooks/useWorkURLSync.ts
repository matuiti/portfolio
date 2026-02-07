"use client";

import { useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useWorkFilter } from "./useWorkFilter";
import { WorkFilterCategory } from "@/types/work";

/**
 * useWorkFilter の戻り値から型を抽出
 */
type WorkFilterReturn = ReturnType<typeof useWorkFilter>;

/**
 * カテゴリ文字列が有効な WorkFilterCategory 型かどうかを判定する型ガード
 * 関数の外に定義することで、どこからでも安全に呼び出せます。
 */
const isValidCategory = (cat: string | null): cat is WorkFilterCategory => {
  const validCategories: WorkFilterCategory[] = ["all", "web", "app", "game"];
  return validCategories.includes(cat as WorkFilterCategory);
};

export function useWorkURLSync(filter: WorkFilterReturn) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // 初回読み込み時のみURLからステートを復元するためのフラグ
  const isInitialSync = useRef(true);

  // 1. URLパラメータが変わった時にステートに反映（ブラウザ操作・直リンク対応）
  useEffect(() => {
    const category = searchParams.get("category");
    const tags = searchParams.get("tags");
    const query = searchParams.get("q");
    const page = searchParams.get("page");

    // --- 型安全なカテゴリ同期 ---
    if (category && isValidCategory(category)) {
      if (category !== filter.selectedCategory) {
        filter.setSelectedCategory(category);
      }
    }

    // タグの同期
    if (tags) {
      const tagArray = tags.split(",");
      if (JSON.stringify(tagArray) !== JSON.stringify(filter.selectedTags)) {
        filter.setSelectedTags(tagArray);
      }
    } else if (filter.selectedTags.length > 0 && isInitialSync.current) {
      filter.setSelectedTags([]);
    }

    // 検索クエリの同期
    if (query !== null && query !== filter.searchQuery) {
      filter.setSearchQuery(query);
    }

    // ページ番号の同期
    if (page) {
      const pageNum = Number(page);
      if (pageNum !== filter.currentPage) {
        filter.setCurrentPage(pageNum);
      }
    }

    isInitialSync.current = false;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // 2. ステートが変わった時にURLパラメータへ反映（ユーザー操作の同期）
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
