// src/app/works/components/WorksLayout/WorksSidebar.tsx
"use client";

import React, { useMemo } from "react";
import { useWorkStore} from "@/store/useWorkStore";
import { SearchBox } from "@/components/ui/SearchBox";
import { CategoryList } from "@/components/ui/CategoryList";
import { TagFilters } from "@/components/ui/TagFilters";
import { WORK_CATEGORIES, ALL_WORKS } from "@/data/works";
import { WorkCategory } from "@/types/work";
import styles from "./WorksSidebar.module.scss";

// 規約：interface を禁止し、type で定義 [cite: 7, 425]
type WorksSidebarProps = {
  footerNote?: string;
};

/**
 * WORKS ページ専用サイドバー
 * ストアの状態を Pure UI コンポーネントへ橋渡しする役割を担います。
 */
export function WorksSidebar({ footerNote }: WorksSidebarProps) {
  // 1. ストアから状態とアクションを取得 [cite: 8, 345]
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    toggleTag,
    clearFilters,
  } = useWorkStore();

  // 2. 利用可能な全タグを動的に抽出 [cite: 314]
  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    // 全実績データからタグを収集（フィルタリング結果ではなく全データから抽出が一般的）
    ALL_WORKS.forEach((work) => work.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  // 3. カテゴリごとの件数計算（型安全な reduce 実装） [cite: 63, 64]
  const categoryCounts = useMemo(() => {
    return WORK_CATEGORIES.reduce(
      (acc, cat) => {
        if (cat.value === "all") {
          acc[cat.value] = ALL_WORKS.length;
        } else {
          const targetCat = cat.value as WorkCategory;
          acc[cat.value] = ALL_WORKS.filter((w) =>
            w.category.includes(targetCat),
          ).length;
        }
        return acc;
      },
      {} as Record<string, number>,
    );
  }, []);

  return (
    <aside className={styles.container}>
      <div className={styles.inner}>
        {/* 固定ヘッダーエリア：検索ボックスとリセット */}
        <div className={styles.head}>
          <div className={styles.head__inner}>
            <span className={styles.label}>Keyword</span>
            <SearchBox
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="キーワードで検索..."
            />
            <button
              type="button"
              onClick={clearFilters}
              className={styles.resetBtn}
            >
              フィルターをリセット
            </button>
          </div>
        </div>

        {/* スクロール可能エリア：カテゴリとタグ */}
        <div className={styles.body}>
          <section className={styles.section}>
            <h3 className={styles.label}>Category</h3>
            <CategoryList
              items={WORK_CATEGORIES}
              selected={selectedCategory}
              onChange={setSelectedCategory}
              counts={categoryCounts}
            />
          </section>

          <section className={styles.section}>
            <h3 className={styles.label}>Tags</h3>
            <TagFilters
              tags={availableTags}
              selectedTags={selectedTags}
              onToggle={toggleTag}
            />
          </section>
        </div>

        {/* 下部エリア：注釈 [cite: 65, 427] */}
        {footerNote && (
          <div className={styles.foot}>
            <p className={styles.foot__text}>{footerNote}</p>
          </div>
        )}
      </div>
    </aside>
  );
}