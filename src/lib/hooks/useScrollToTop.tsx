'use client';
import { useEffect } from 'react';
export function useScrollToTop() {
  /**
   * ページ遷移時のスクロール位置補正
   * コンポーネントがブラウザに読み込まれた瞬間、
   * 前のページのスクロール位置が残っている場合を考慮し、
   * 強制的に最上部 (y=0) へスクロールさせます。
   */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}
