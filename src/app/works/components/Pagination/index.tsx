"use client";

import React from "react";

/**
 * Pagination コンポーネントの型定義
 * @param current - 現在表示中のページ番号
 * @param total - 全ページ数
 * @param onPageChange - ページ番号がクリックされた時のコールバック関数
 */
type PaginationProps = {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ current, total, onPageChange }: PaginationProps) {
  // 1ページしかない場合は、ページ移動の必要がないため何も表示しない
  if (total <= 1) return null;

  // ページ番号の配列を作成（例：totalが3なら [1, 2, 3]）
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <nav
      className="flex justify-center items-center gap-3 mt-16 mb-12"
      aria-label="ワーク一覧のページネーション"
    >
      {pages.map((page) => {
        const isCurrent = current === page;

        return (
          <button
            key={page}
            type="button"
            onClick={() => {
              // ページを変更
              onPageChange(page);
              // ページ上部へスムーズにスクロール
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            // アクセシビリティ：現在のページであることを示す
            aria-current={isCurrent ? "page" : undefined}
            aria-label={`${page}ページ目へ移動`}
            className={`
              relative flex items-center justify-center
              w-11 h-11 sm:w-12 sm:h-12 
              rounded-2xl text-sm font-bold
              transition-all duration-300 ease-out
              ${
                isCurrent
                  ? "bg-slate-900 text-white shadow-lg shadow-slate-200 scale-110 z-10"
                  : "bg-white text-slate-500 border border-slate-200 hover:border-slate-900 hover:text-slate-900 hover:shadow-md active:scale-95"
              }
            `}
          >
            {page}
            {/* アクティブなページの下に小さなドットを表示する装飾（オプション） */}
            {isCurrent && (
              <span className="absolute -bottom-1 w-1 h-1 bg-white rounded-full" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
