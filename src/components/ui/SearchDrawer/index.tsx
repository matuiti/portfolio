// src/components/ui/SearchDrawer/index.tsx
'use client';

import { Close } from '@/components/ui/Icons';
import { SearchBox } from '@/components/ui/SearchBox';
import { CategoryList } from '@/components/ui/CategoryList';
import { TagFilters } from '@/components/ui/TagFilters';
import styles from './SearchDrawer.module.scss';

type CategoryItem<T extends string> = {
  label: string;
  value: T;
};

type SearchDrawerProps<T extends string> = {
  isOpen: boolean;
  onClose: () => void;
  totalCount: number;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  categories: CategoryItem<T>[];
  selectedCategory: T;
  setSelectedCategory: (val: T) => void;
  categoryCounts: Record<string, number>;
  availableTags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  clearFilters: () => void;
  footerNote?: string;
};

/**
 * 共通検索ドロワーコンポーネント
 * ジェネリクス T により、WORKS(WorkFilterCategory) と
 * GALLERY(Category) に両対応
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
  footerNote,
}: SearchDrawerProps<T>) {
  return (
    <div className={`${styles.root} ${isOpen ? styles['is-open'] : ''}`}>
      {/* オーバーレイ */}
      <div
        className={`${styles.overlay} ${isOpen ? styles['is-open'] : ''}`}
        onClick={onClose}
        aria-hidden='true'
      />

      {/* ドロワー：本体 */}
      <aside
        className={`section-padding-x pb-10 ${styles.drawer} ${isOpen ? styles['is-open'] : ''}`}
        aria-labelledby='search-drawer-title'
      >
        <div className={styles.inner}>
          <div className={styles.btnWrapper}>
            <button
              onClick={onClose}
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
            </div>
          </div>

          {/* ドロワー：中部スクロール可能エリア */}
          <div className={styles.body}>
            <section className={styles.section}>
              <h3 className={styles.label}>カテゴリー</h3>
              <CategoryList<T>
                items={categories}
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

          {/* ドロワー：下部エリア、WORKS特有の注釈などをProps経由で表示 */}
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
