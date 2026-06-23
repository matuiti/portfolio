'use client';
import { useMemo } from 'react';
import { useWorkStore } from '@/lib/store/useWorkStore';
import { SearchBox } from '@/components/ui/SearchBox';
import { CategoryList } from '@/components/ui/CategoryList';
import { TagFilters } from '@/components/ui/TagFilters';
import { WORK_CATEGORIES, ALL_WORKS } from '@/data/works';
import { WorkCategory } from '@/types/work';
import styles from './WorksSidebar.module.css';
import { scrollToTop } from '@/lib/utility/scrollToTop';

export function WorksSidebar() {
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
        if (cat.id === 'all') {
          acc[cat.id] = ALL_WORKS.length;
        } else {
          const targetCat = cat.id as WorkCategory;
          acc[cat.id] = ALL_WORKS.filter((w) =>
            w.category.includes(targetCat),
          ).length;
        }
        return acc;
      },
      {} as Record<string, number>,
    );
  }, []);

  const handleClear = () => {
    clearFilters();
    scrollToTop();
  };

  return (
    <aside className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <div className={styles.head__inner}>
            <span className={styles.label}>キーワード</span>
            <SearchBox value={searchQuery} onChange={setSearchQuery} />
            <button
              type='button'
              onClick={handleClear}
              className={styles.resetBtn}
            >
              フィルターをリセット
            </button>
          </div>
        </div>

        {/* スクロール可能エリア */}
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
            <h3 className={styles.label}>キーワードタグ</h3>
            <TagFilters
              tags={availableTags}
              selectedTags={selectedTags}
              onToggle={toggleTag}
            />
          </section>
        </div>

        <div className={styles.foot}>
          <p className={styles.foot__text}>
            ※「非公開」タグの実績は、契約上の理由により最適化されたデータを掲載しています。
          </p>
        </div>
      </div>
    </aside>
  );
}
