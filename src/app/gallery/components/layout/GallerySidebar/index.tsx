'use client';
import { useMemo } from 'react';
import { useGalleryStore } from '@/lib/store/useGalleryStore';
import { SearchBox } from '@/components/ui/SearchBox';
import { CategoryList } from '@/components/ui/CategoryList';
import { TagFilters } from '@/components/ui/TagFilters';
import { scrollToTop } from '@/lib/utility/scrollToTop';
import { GalleryCategory } from '@/gallery/types';
import { UI_PARTS } from '@/gallery/data/ui-parts';
import { GALLERY_CATEGORIES } from '@/gallery/data';
import styles from './GallerySidebar.module.css';

export function GallerySidebar() {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    toggleTag,
    clearFilters,
  } = useGalleryStore();

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    UI_PARTS.forEach((GalleryUIPart) =>
      GalleryUIPart.tags.forEach((tag) => tags.add(tag)),
    );
    return Array.from(tags).sort();
  }, []);

  const categoryCounts = useMemo(() => {
    return GALLERY_CATEGORIES.reduce(
      (acc, cat) => {
        if (cat.id === 'all') {
          acc[cat.id] = UI_PARTS.length;
        } else {
          const targetCat = cat.id as GalleryCategory;
          acc[cat.id] = UI_PARTS.filter((w) =>
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
              items={GALLERY_CATEGORIES}
              selected={selectedCategory}
              onChange={setSelectedCategory}
              counts={categoryCounts}
            />
          </section>
          <section className={styles.section}>
            <h3 className={styles.label}>タグ</h3>
            <TagFilters
              tags={availableTags}
              selectedTags={selectedTags}
              onToggle={toggleTag}
            />
          </section>
        </div>
      </div>
    </aside>
  );
}
