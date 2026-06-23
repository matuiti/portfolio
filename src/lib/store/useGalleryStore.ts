import { useMemo } from 'react';
import { create } from 'zustand';
import { GalleryCategory, GalleryState, UIPart } from '@/gallery/types';
import { useShallow } from 'zustand/shallow';
import { UI_PARTS } from '@/gallery/data/ui-parts';

// 「フィルタ条件」をリセットする際の共通の土台
// selectOnlyTag / selectOnlyCategory / clearFilters はこれを展開して使用する
const RESET_FILTERS = {
  searchQuery: '',
  selectedCategory: 'all' as GalleryCategory,
  selectedTags: [] as string[],
  currentPage: 1,
};

export const useGalleryStore = create<GalleryState>((set) => ({
  // --- 初期値 ---
  searchQuery: '',
  selectedCategory: 'all',
  selectedTags: [],
  currentPage: 1,
  itemsPerPage: 6,

  // --- 単一条件の更新アクション ---
  // 自分の対象フィールドだけを更新し、他のフィルタ条件には影響しない。
  setSearchQuery: (q) => set({ searchQuery: q, currentPage: 1 }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat, currentPage: 1 }),
  setSelectedTags: (tags) => set({ selectedTags: tags, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),
  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
      currentPage: 1,
    })),

  clearFilters: () => set({ ...RESET_FILTERS }),
}));

/**
 * フィルタリング済みのデータを取得するセレクター
 * 使用例： const filteredUIParts = useFilteredUIParts();
 */
export const useFilteredUIParts = () => {
  const filters = useGalleryStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      selectedCategory: state.selectedCategory,
      selectedTags: state.selectedTags,
    })),
  );

  return useMemo(() => filterUIParts(UI_PARTS, filters), [filters]);
};

const filterUIParts = (
  UIParts: UIPart[],
  {
    searchQuery,
    selectedCategory,
    selectedTags,
  }: {
    searchQuery: string;
    selectedCategory: GalleryCategory;
    selectedTags: string[];
  },
) => {
  const query = searchQuery.toLowerCase();

  return UIParts.filter((UIPart) => {
    const matchCategory =
      selectedCategory === 'all' || UIPart.category.includes(selectedCategory);

    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => UIPart.tags.includes(tag)); // AND検索

    const matchQuery =
      query === '' ||
      UIPart.title.toLowerCase().includes(query) ||
      UIPart.tags.some((t) => t.toLowerCase().includes(query));

    return matchCategory && matchTags && matchQuery;
  });
};
