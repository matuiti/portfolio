'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { URLSyncState, URLSyncActions } from '@/types/filtering';

/**
 * 共通：URLステート同期システム
 * 共通仕様書に基づき、category, tags, q, page パラメータを双方向同期します。
 * URLにパラメータがない場合は、ストアの状態をデフォルトにリセットします。
 */
export function useCommonURLSync<T extends string>(
  state: URLSyncState<T>,
  actions: URLSyncActions<T>,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);
  const [debouncedQuery, setDebouncedQuery] = useState(state.searchQuery);

  // 1. 初期化：アドレスバー（URL）をもとにステートを復元（パラメータがない場合はリセット）
  useEffect(() => {
    const category = searchParams.get('category');
    const tags = searchParams.get('tags');
    const q = searchParams.get('q');
    const page = searchParams.get('page');

    // カテゴリの同期：なければ "all" に強制リセット
    actions.setSelectedCategory((category as T) || ('all' as T));

    // タグの同期：なければ空配列 [] に強制リセット
    if (tags) {
      const tagList = tags.split(',').filter(Boolean);
      actions.setSelectedTags(tagList);
    } else {
      actions.setSelectedTags([]);
    }

    // 検索クエリの同期：なければ空文字 "" に強制リセット
    actions.setSearchQuery(q || '');

    // ページ番号の同期：なければ 1 に強制リセット
    actions.setCurrentPage(page ? Number(page) : 1);

    isInitialMount.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ページマウント時の初期化として1回だけ実行

  // 2. デバウンス処理：入力停止から300ms後にURL反映用Stateを更新
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(state.searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [state.searchQuery]);

  // 3. ステート変化をURLに反映 (router.replace)
  useEffect(() => {
    // ステートの復元をまだ終えていないなら処理を抜ける
    if (isInitialMount.current) return;

    const params = new URLSearchParams();

    // カテゴリが "all" 以外ならパラメータに追加
    if (state.category && state.category !== 'all') {
      params.set('category', state.category);
    }

    // タグがあればカンマ区切りで追加
    if (state.tags.length > 0) {
      params.set('tags', state.tags.join(','));
    }

    // デバウンスされた検索語句があれば追加
    if (debouncedQuery) {
      params.set('q', debouncedQuery);
    }

    // 2ページ目以降ならページ番号を追加
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
}
