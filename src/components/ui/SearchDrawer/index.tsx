// src/components/ui/SearchDrawer/index.tsx
"use client";

import React from "react";
import { Close } from "@/components/ui/Icons";
import { SearchBox } from "@/components/ui/SearchBox";
import { CategoryList } from "@/components/ui/CategoryList";
import { TagFilters } from "@/components/ui/TagFilters";
import styles from "./SearchDrawer.module.scss";

// カテゴリ用アイテムの型定義（Tは各ページのリテラル型を継承） [2]
type CategoryItem<T extends string> = {
  label: string;
  value: T;
};

type SearchDrawerProps<T extends string> = {
  isOpen: boolean;
  onClose: () => void;
  // 検索・フィルタ用ステートとアクション
  totalCount: number;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  categories: CategoryItem<T>[]; // 外部から注入 [4]
  selectedCategory: T;
  setSelectedCategory: (val: T) => void;
  categoryCounts: Record<string, number>;
  availableTags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  footerNote?: string; // ページ固有の注釈用 [5]
};

/**
 * 共通検索ドロワーコンポーネント
 * ジェネリクス T により、WORKS(WorkFilterCategory) と
 * GALLERY(Category) の両方に対応します。 [6, 7]
 */
export function SearchDrawer<T extends string>({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
  categoryCounts,
  availableTags,
  selectedTags,
  toggleTag,
  clearFilters,
  footerNote, // 引数に追加
}: SearchDrawerProps<T>) {
  return (
    <div className={`${styles.root} ${isOpen ? styles["is-open"] : ""}`}>
      {/* 1. オーバーレイ */}
      <div
        className={`${styles.overlay} ${isOpen ? styles["is-open"] : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 2. ドロワー本体：開閉アニメーションを適用するコンテナ */}
      <aside
        className={`section-padding-x pb-10 ${styles.drawer} ${isOpen ? styles["is-open"] : ""}`}
        aria-labelledby="search-drawer-title"
      >
        <div className={styles.inner}>
          {/* 閉じるボタンエリア */}
          <div className={styles.btnWrapper}>
            <button
              onClick={onClose}
              className={styles.closeBtn}
              aria-label="メニューを閉じる"
            >
              <Close />
            </button>
          </div>

          {/* 固定エリア：ヘッダー */}
          <div className={styles.head}>
            <div className={styles.head__inner}>
              <h3 className={styles.label}>Keyword</h3>
              <SearchBox value={searchQuery} onChange={setSearchQuery} />
              <button
                type="button"
                onClick={clearFilters}
                className={styles.resetBtn}
              >
                フィルターをリセット
              </button>
            </div>
          </div>

          {/* スクロール可能エリア */}
          <div className={styles.body}>
            {/* カテゴリーセクション */}
            <section className={styles.section}>
              <h3 className={styles.label}>Category</h3>
              <CategoryList<T>
                items={categories}
                selected={selectedCategory}
                onChange={setSelectedCategory}
                counts={categoryCounts}
              />
            </section>

            {/* タグセクション */}
            <section className={styles.section}>
              <h3 className={styles.label}>Tags</h3>
              <TagFilters
                tags={availableTags}
                selectedTags={selectedTags}
                onToggle={toggleTag}
              />
            </section>
          </div>

          {/* 下部エリア：WORKS特有の注釈などをProps経由で表示 [16] */}
          {footerNote && (
            <div className={styles.foot}>
              <p className={styles.foot__text}>{footerNote}</p>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
