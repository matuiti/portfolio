import { useMemo } from 'react';
import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';
import { Work, WorkCategory, WorkState } from '@/types/work';
import { ResetFilters } from '@/works/types';
import { ALL_WORKS } from '@/data/works';
import { WORKS_SETTINGS } from '@/works/data';

// 「フィルタ条件」をリセットする際の共通の土台
const RESET_FILTERS: ResetFilters = {
  searchQuery: '',
  selectedCategory: WORKS_SETTINGS.DEFAULT_CATEGORY,
  selectedTags: [],
  currentPage:WORKS_SETTINGS.INIT_PAGE_NAM,
};

export const useWorkStore = create<WorkState>((set) => ({
  // --- 初期値 ---
  searchQuery: '',
  selectedCategory: WORKS_SETTINGS.DEFAULT_CATEGORY,
  selectedTags: [],
  currentPage: WORKS_SETTINGS.INIT_PAGE_NAM,
  itemsPerPage: WORKS_SETTINGS.ITEMS_PER_PAGE,

  // --- 単一条件の更新アクション ---
  // 自分の対象フィールドだけを更新し、他のフィルタ条件には影響しない。
  setSearchQuery: (q) =>
    set({ searchQuery: q, currentPage: WORKS_SETTINGS.INIT_PAGE_NAM }),
  setSelectedCategory: (cat) =>
    set({ selectedCategory: cat, currentPage: WORKS_SETTINGS.INIT_PAGE_NAM }),
  setSelectedTags: (tags) =>
    set({ selectedTags: tags, currentPage: WORKS_SETTINGS.INIT_PAGE_NAM }),
  setCurrentPage: (page) => set({ currentPage: page }),
  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
      currentPage: WORKS_SETTINGS.INIT_PAGE_NAM,
    })),

  // --- 排他的フィルタ選択アクション ---
  // 他のフィルタ条件をすべてリセットしてから、指定した条件のみを設定する。
  selectOnlyTag: (tag) => set({ ...RESET_FILTERS, selectedTags: [tag] }),
  selectOnlyCategory: (cat) => set({ ...RESET_FILTERS, selectedCategory: cat }),
  clearFilters: () => set({ ...RESET_FILTERS }),
}));

/**
 * フィルタリング済みのデータを取得するセレクター
 * 使用例： const filteredWorks = useFilteredWorks();
 */
export const useFilteredWorks = () => {
  const filters = useWorkStore(
    useShallow((state) => ({
      searchQuery: state.searchQuery,
      selectedCategory: state.selectedCategory,
      selectedTags: state.selectedTags,
    })),
  );

  return useMemo(() => filterWorks(ALL_WORKS, filters), [filters]);
};

const filterWorks = (
  works: Work[],
  {
    searchQuery,
    selectedCategory,
    selectedTags,
  }: {
    searchQuery: string;
    selectedCategory: WorkCategory;
    selectedTags: string[];
  },
) => {
  const query = searchQuery.toLowerCase();

  return works.filter((work) => {
    const matchCategory =
      selectedCategory === 'all' || work.category.includes(selectedCategory);

    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => work.tags.includes(tag)); // AND検索

    const matchQuery =
      query === '' ||
      work.title.toLowerCase().includes(query) ||
      work.role.toLowerCase().includes(query) ||
      work.tags.some((t) => t.toLowerCase().includes(query)) ||
      work.summary.toLowerCase().includes(query) ||
      work.background?.toLowerCase().includes(query) ||
      work.features?.some((t) => t.toLowerCase().includes(query)) ||
      work.points?.some((t) => t.toLowerCase().includes(query));

    return matchCategory && matchTags && matchQuery;
  });
};
