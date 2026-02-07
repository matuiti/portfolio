"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useWorkStore } from "@/store/useWorkStore";
import { WorkFilterCategory } from "@/types/work";

/**
 * URLパラメータとZustandストアを同期させるフック
 */
export function useWorkURLSync() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  const {
    selectedCategory,
    selectedTags,
    searchQuery,
    setSearchQuery,
    selectOnlyTag,
    selectOnlyCategory,
  } = useWorkStore();

  // 1. 初回マウント時：URLパラメータをストアに反映
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const tagsParam = searchParams.get("tags");
    const qParam = searchParams.get("q");

    // タグの同期処理
    if (tagsParam) {
      // カンマ区切りで配列化し、空文字を除去
      const tagsArray = tagsParam.split(",").filter(Boolean);
      if (tagsArray.length > 0) {
        // 【修正ポイント】配列全体ではなく、最初の1要素 (string) を渡す
        selectOnlyTag(tagsArray[0]);
      }
    }
    // カテゴリの同期
    else if (categoryParam) {
      selectOnlyCategory(categoryParam as WorkFilterCategory);
    }
    // 検索クエリの同期
    else if (qParam) {
      setSearchQuery(qParam);
    }

    isInitialMount.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ページマウント時の初期化として1回だけ実行

  // 2. ストアの変化をURLに反映（WORKSページ内での操作を同期）
  useEffect(() => {
    // 初期化中はURLを上書きしない
    if (isInitialMount.current) return;

    const params = new URLSearchParams();

    // カテゴリが "all" 以外ならパラメータに追加
    if (selectedCategory !== "all") {
      params.set("category", selectedCategory);
    }

    // タグがあればカンマ区切りで追加
    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }

    // 検索語句があれば追加
    if (searchQuery) {
      params.set("q", searchQuery);
    }

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    // ブラウザの履歴を汚さずにURLを更新
    router.replace(url, { scroll: false });
  }, [selectedCategory, selectedTags, searchQuery, pathname, router]);
}
