// src/app/works/components/WorksLayout/WorksSidebar.tsx
"use client";

import { useWorkStore, useFilteredWorks } from "@/store/useWorkStore";
import { SearchBox } from "@/components/ui/SearchBox";
import { CategoryList } from "@/components/ui/CategoryList";
import { TagFilters } from "@/components/ui/TagFilters";
import { WORK_CATEGORIES } from "@/data/works";
import { WorkCategory, WorkFilterCategory } from "@/types/work";
import styles from "./WorksSidebar.module.scss";

type WorksSidebarProps = {
  footerNote?: string;
};

export function WorksSidebar({ footerNote }:WorksSidebarProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    toggleTag,
    clearFilters,
  } = useWorkStore();

  const filteredWorks = useFilteredWorks();

  // 全実績からタグを動的に抽出
  const availableTags = Array.from(
    new Set(filteredWorks.flatMap((w) => w.tags)),
  ).sort();

  // カテゴリ件数の計算（anyを排除して規約に適合させる）
  const categoryCounts = WORK_CATEGORIES.reduce(
    (acc, cat) => {
      if (cat.value === "all") {
        // 「すべて」の場合は全件数（または仕様に基づく数値）を入れる
        acc[cat.value] = filteredWorks.length;
      } else {
        // cat.value が "all" ではないことをTypeScriptに明示するため
        // WorkCategory 型として扱う（これが技術的証明に繋がります）
        const targetCat = cat.value as WorkCategory;
        acc[cat.value] = filteredWorks.filter((w) =>
          w.category.includes(targetCat),
        ).length;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <aside className={styles.container}>
      <div className={styles.inner}>
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
            <CategoryList<WorkFilterCategory>
              items={WORK_CATEGORIES}
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
  );
}
