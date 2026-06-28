'use client';
import { Close } from '@/components/ui/Icons';
import { SearchBox } from '@/components/ui/SearchBox';
import { CategoryList } from '@/components/ui/CategoryList';
import { TagFilters } from '@/components/ui/TagFilters';
import { useStore } from '@/lib/store/useStore';
import {
  useFilteredUIParts,
  useGalleryStore,
} from '@/lib/store/useGalleryStore';
import { TitleAndCount } from '@/components/ui/TitleAndCount';
import { useMemo } from 'react';
import { GALLERY_CATEGORIES } from '@/gallery/data';
import { GalleryCategory } from '@/gallery/types';
import styles from './SearchGalleryDrawer.module.css';

export function SearchGalleryDrawer() {
  const { isSearchDrawerOpen, setSearchDrawerOpen } = useStore();
  const store = useGalleryStore();
  const filteredGallery = useFilteredUIParts();
  const searchQuery = store.searchQuery;
  const setSearchQuery = store.setSearchQuery;
  const selectedCategory = store.selectedCategory;
  const setSelectedCategory = store.setSelectedCategory;
  const selectedTags = store.selectedTags;
  const categories = GALLERY_CATEGORIES;
  const toggleTag = store.toggleTag;
  const clearFilters = store.clearFilters;

  // 全実績のタグから重複を排除、五十音順に並び替えて抽出
  const availableTags = Array.from(
    new Set(filteredGallery.flatMap((w) => w.tags)),
  ).sort();

  const categoryCounts = GALLERY_CATEGORIES.reduce(
    (acc, cat) => {
      if (cat.id === 'all') {
        acc[cat.id] = filteredGallery.length;
      } else {
        const targetCat = cat.id as GalleryCategory;
        acc[cat.id] = filteredGallery.filter((w) =>
          w.category.includes(targetCat),
        ).length;
      }
      return acc;
    },
    {} as Record<string, number>,
  );

  const totalHitCount = filteredGallery.length;

  // カテゴリーIDからラベルを取得するロジック
  const selectedCategoryLabel = GALLERY_CATEGORIES.find(
    (cat) => cat.id === store.selectedCategory,
  )?.label;

  const renderedTitle = useMemo(() => {
    if (store.searchQuery) {
      return `「${store.searchQuery}」の検索結果`;
    }
    const baseTitle =
      store.selectedCategory === 'all'
        ? 'すべてのアイテム'
        : selectedCategoryLabel || 'すべてのアイテム';
    const hasTags = store.selectedTags && store.selectedTags.length > 0;
    return (
      <>
        <span>{baseTitle}</span>
        {hasTags && (
          <span className='text-[calc(12/16*1rem)] font-normal ml-2'>
            {store.selectedTags.map((tag) => `#${tag}`).join(' ')}
          </span>
        )}
      </>
    );
  }, [
    store.searchQuery,
    store.selectedCategory,
    store.selectedTags,
    selectedCategoryLabel,
  ]);

  return (
    <div
      className={`${styles.root} ${isSearchDrawerOpen ? styles['is-open'] : ''}`}
    >
      {/* オーバーレイ */}
      <div
        className={`${styles.overlay} ${isSearchDrawerOpen ? styles['is-open'] : ''}`}
        onClick={() => setSearchDrawerOpen(!isSearchDrawerOpen)}
        aria-hidden='true'
      />

      {/* ドロワー：本体 */}
      <aside
        className={`section-padding-x pb-10 ${styles.drawer} ${isSearchDrawerOpen ? styles['is-open'] : ''}`}
        aria-labelledby='search-drawer-title'
      >
        <div className={styles.inner}>
          <div className={styles.btnWrapper}>
            <button
              onClick={() => setSearchDrawerOpen(!isSearchDrawerOpen)}
              className={styles.closeBtn}
              aria-label='メニューを閉じる'
            >
              <Close />
            </button>
          </div>

          {/* ドロワー：上部固定エリア */}
          <div className={styles.head}>
            <div className={styles.head__inner}>
              <h3 className={styles.label}>キーワード</h3>
              <SearchBox value={searchQuery} onChange={setSearchQuery} />
              <button
                type='button'
                onClick={clearFilters}
                className={styles.resetBtn}
              >
                フィルターをリセット
              </button>
              <div className='mt-5'>
                <TitleAndCount title={renderedTitle} count={totalHitCount} />
              </div>
            </div>
          </div>

          {/* ドロワー：中部スクロール可能エリア */}
          <div className={styles.body}>
            <section className={styles.section}>
              <h3 className={styles.label}>カテゴリー</h3>
              <CategoryList<GalleryCategory>
                items={categories}
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
    </div>
  );
}
