// src/lib/hooks/useCommonURLSync.ts
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { URLSyncState, URLSyncActions } from "@/types/filtering";

/**
 * 共通URLステート同期システム
 * 共通仕様書 に基づき、category, tags, q, page パラメータを双方向同期します。
 */
export function useCommonURLSync<T extends string>(
  state: URLSyncState<T>,
  actions: URLSyncActions<T>,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  // 検索クエリのデバウンス用State（URL反映の頻度を抑制） [2, 3]
  const [debouncedQuery, setDebouncedQuery] = useState(state.searchQuery);

  // 1. 初期化時：URLからステートを復元
  useEffect(() => {
    const category = searchParams.get("category");
    const tags = searchParams.get("tags");
    const q = searchParams.get("q");
    const page = searchParams.get("page");

    // 修正箇所：category (string | null) を T 型として扱うようアサーションを追加
    if (category) actions.setSelectedCategory(category as T);

    if (tags) {
      const tagList = tags.split(",").filter(Boolean);
      if (tagList.length > 0) actions.setSelectedTags(tagList);
    }
    if (q) actions.setSearchQuery(q);
    if (page) actions.setCurrentPage(Number(page));

    isInitialMount.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. デバウンス処理：入力停止から300ms後にURL反映用Stateを更新 [3]
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(state.searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [state.searchQuery]);

  // 3. ステート変化をURLに反映 (router.replace)
  useEffect(() => {
    if (isInitialMount.current) return;

    const params = new URLSearchParams();

    if (state.category && state.category !== "all") {
      params.set("category", state.category);
    }

    if (state.tags.length > 0) {
      params.set("tags", state.tags.join(","));
    }

    if (debouncedQuery) {
      params.set("q", debouncedQuery);
    }

    if (state.currentPage > 1) {
      params.set("page", state.currentPage.toString());
    }

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    // ブラウザ履歴を汚さず、スクロール位置を保持して更新 [3]
    router.replace(url, { scroll: false });
  }, [
    state.category,
    state.tags,
    debouncedQuery,
    state.currentPage,
    pathname,
    router,
  ]);
}
