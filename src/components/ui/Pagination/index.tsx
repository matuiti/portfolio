"use client";

import React from "react";
import { KeyboardArrowRight, MoreHoriz } from "@/components/ui/Icons";
import styles from "./Pagination.module.scss";

/**
 * Pagination コンポーネントの型定義
 * プロジェクト規約に基づき interface ではなく type で定義 [1, 2]
 */
type PaginationProps = {
  current: number;
  total: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ current, total, onPageChange }: PaginationProps) {
  // 1ページしかない場合は表示しない [3, 4]
  if (total <= 1) return null;

  /**
   * 表示するページ番号の範囲を計算するロジック
   * 要件：現在の番号を中心に最大3つまで。
   * 例：現在が1なら [5-7]、現在が5なら [3, 8, 9]
   */
  const getPageNumbers = () => {
    const half = 1; // 中心から左右1つずつ
    let start = Math.max(1, current - half);
    let end = Math.min(total, current + half);

    // 1ページ目の時は 1, 2, 3 を表示（totalが3以上の場合）
    if (current === 1) {
      end = Math.min(total, 3);
    }
    // 最終ページの時は total-2, total-1, total を表示
    if (current === total) {
      start = Math.max(1, total - 2);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();
  const showMore = pages[pages.length - 1] < total;

  const handlePageClick = (page: number) => {
    if (page === current) return;
    onPageChange(page);
    // ページ遷移時に最上部へスムーズスクロール [3, 10]
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /**
   * ページ番号を "01" 形式にフォーマットする
   */
  const formatPageNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <nav className={styles.container} aria-label="ページネーション">
      {/* 左アロー：1ページ目以外で表示 */}
      {current > 1 && (
        <button
          type="button"
          onClick={() => handlePageClick(current - 1)}
          className={styles.arrowButton}
          aria-label="前のページへ"
        >
          <KeyboardArrowRight direction="left" />
        </button>
      )}

      {/* ページ番号ボタン */}
      <div className={styles.pageList}>
        {pages.map((page) => {
          const isCurrent = current === page;
          return (
            <button
              key={page}
              type="button"
              onClick={() => handlePageClick(page)}
              aria-current={isCurrent ? "page" : undefined}
              aria-label={`${page}ページ目へ移動`}
              className={`${styles.pageButton} ${isCurrent ? styles.isCurrent : ""}`}
            >
              {formatPageNumber(page)}
            </button>
          );
        })}

        {/* 三点ドットのモアボタン：範囲外のページがある場合に表示 */}
        {showMore && (
          <div className={styles.more} aria-hidden="true">
            <MoreHoriz />
          </div>
        )}
      </div>

      {/* 右アロー：最終ページ以外で表示 */}
      {current < total && (
        <button
          type="button"
          onClick={() => handlePageClick(current + 1)}
          className={styles.arrowButton}
          aria-label="次のページへ"
        >
          <KeyboardArrowRight />
        </button>
      )}
    </nav>
  );
}
