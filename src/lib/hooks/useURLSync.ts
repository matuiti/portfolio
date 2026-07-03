'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { URLSyncActions, URLSyncState } from '@/types/urlSync';

/**
 * 共通：URLステート同期システム
 * 共通仕様書に基づき、category, tags, q, page パラメータを双方向同期します。
 * URLにパラメータがない場合は、ストアの状態をデフォルトにリセットします。
 */
export function useURLSync<T extends string>(
  state: URLSyncState<T>,
  actions: URLSyncActions<T>,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);
  const [debouncedQuery, setDebouncedQuery] = useState(state.searchQuery);

  // 初期化：アドレスバー（URL）をもとにステートを復元（パラメータがない場合はリセット）
  useEffect(() => {
    const category = searchParams.get('category');
    const tags = searchParams.get('tags');
    const q = searchParams.get('q');
    const page = searchParams.get('page');

    actions.setSelectedCategory((category as T) || ('all' as T));

    if (tags) {
      const tagList = tags.split(',').filter(Boolean);
      actions.setSelectedTags(tagList);
    } else {
      actions.setSelectedTags([]);
    }

    actions.setSearchQuery(q || '');

    actions.setCurrentPage(page ? Number(page) : 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // デバウンス処理：入力停止から指定ms後にURL反映用Stateを更新
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(state.searchQuery);
    }, 400);

    return () => clearTimeout(timer);
  }, [state.searchQuery]);

  // ステート変化をURLに反映 (router.replace)
  useEffect(() => {
    // ステートの復元をまだ終えていないなら処理を抜ける
    if (isInitialMount.current) return;

    const params = new URLSearchParams();

    if (state.category && state.category !== 'all') {
      params.set('category', state.category);
    }

    if (state.tags.length > 0) {
      params.set('tags', state.tags.join(','));
    }

    if (debouncedQuery) {
      params.set('q', debouncedQuery);
    }

    if (state.currentPage > 1) {
      params.set('page', state.currentPage.toString());
    }

    const query = params.toString();
    const url = query ? `${pathname}?${query}` : pathname;

    // ブラウザ履歴を汚さず、スクロール位置を保持してURLを更新
    router.replace(url, { scroll: false });
  }, [
    state.category,
    state.tags,
    debouncedQuery,
    state.currentPage,
    pathname,
    router,
  ]);

  // 初期化(effect 1〜3)が同一コミットで走り終えたあとにフラグを下ろす。
  // 宣言順で最後に実行されるため、effect 3 は初回マウント時には
  // isInitialMount.current === true を見て確実にスキップできる。
  useEffect(() => {
    isInitialMount.current = false;
  }, []);
}
