'use client';
import { useMemo } from 'react';
import { useWorkStore } from '@/store/useWorkStore';
import { SearchBox } from '@/components/ui/SearchBox';
import { CategoryList } from '@/components/ui/CategoryList';
import { TagFilters } from '@/components/ui/TagFilters';
import { WORK_CATEGORIES, ALL_WORKS } from '@/data/works';
import { WorkCategory } from '@/types/work';
import styles from './WorksSidebar.module.css';

type WorksSidebarProps = {
  footerNote?: string;
};

export function WorksSidebar({ footerNote }: WorksSidebarProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    toggleTag,
    clearFilters,
  } = useWorkStore();

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    ALL_WORKS.forEach((work) => work.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  const categoryCounts = useMemo(() => {
    return WORK_CATEGORIES.reduce(
      (acc, cat) => {
        if (cat.value === 'all') {
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
            <span className={styles.label}>キーワード</span>
            <SearchBox value={searchQuery} onChange={setSearchQuery} />
            <button
              type='button'
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
            <h3 className={styles.label}>カテゴリー</h3>
            <CategoryList
              items={WORK_CATEGORIES}
              selected={selectedCategory}
              onChange={setSelectedCategory}
              counts={categoryCounts}
            />
          </section>

          <section className={styles.section}>
            <h3 className={styles.label}>使用スキル</h3>
            <TagFilters
              tags={availableTags}
              selectedTags={selectedTags}
              onToggle={toggleTag}
            />
          </section>
        </div>

        {/* 下部エリア：注釈 */}
        {footerNote && (
          <div className={styles.foot}>
            <p className={styles.foot__text}>{footerNote}</p>
          </div>
        )}
      </div>
    </aside>
  );
}
