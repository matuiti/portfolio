"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useWorkStore } from "@/store/useWorkStore";
import { WorkFilterCategory } from "@/types/work";

/**
 * URLパラメータとZustandストアを同期させるフック
 * SKILLSページ等からの検索パラメータ（category, q, tags）を確実に反映させます。
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
    setSelectedCategory,
    setSelectedTags,
  } = useWorkStore();

  // 1. 初回マウント時：URLパラメータをストアに反映
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const tagsParam = searchParams.get("tags");
    const qParam = searchParams.get("q");

    // 複数のパラメータが同時に存在する場合を考慮し、独立して判定を行う
    // （旧ロジック：if-else if による排他処理を解消）

    // カテゴリの同期
    if (categoryParam) {
      setSelectedCategory(categoryParam as WorkFilterCategory);
    }

    // タグの同期
    if (tagsParam) {
      const tagsArray = tagsParam.split(",").filter(Boolean);
      if (tagsArray.length > 0) {
        setSelectedTags(tagsArray);
      }
    }

    // 検索クエリの同期（SKILLSページからの ?q=Keyword 等を反映）
    if (qParam) {
      setSearchQuery(qParam);
    }

    isInitialMount.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ページマウント時の初期化として1回だけ実行

  // 2. ストアの変化をURLに反映（WORKSページ内での操作をURLに同期）
  useEffect(() => {
    // 初期化完了前、または初期読み込み中はURLを上書きしない
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