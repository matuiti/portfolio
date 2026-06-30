import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';
import { UI_PARTS } from '@/gallery/data/ui-parts';
import {
  GalleryCategory,
  GalleryState,
  ResetFilters,
  GalleryUIPart,
} from '@/gallery/types';
import { GALLERY_SETTINGS } from '@/gallery/data';

// 「フィルタ条件」をリセットする際の共通の土台
const RESET_FILTERS: ResetFilters = {
  searchQuery: '',
  selectedCategory: GALLERY_SETTINGS.DEFAULT_CATEGORY,
  selectedTags: [],
  currentPage: GALLERY_SETTINGS.INIT_PAGE_NAM,
};

export const useGalleryStore = create<GalleryState>((set) => ({
  // --- 初期値 ---
  searchQuery: '',
  selectedCategory: GALLERY_SETTINGS.DEFAULT_CATEGORY,
  selectedTags: [],
  currentPage: GALLERY_SETTINGS.INIT_PAGE_NAM,
  itemsPerPage: GALLERY_SETTINGS.ITEMS_PER_PAGE,

  // --- 単一条件の更新アクション ---
  // 自分の対象フィールドだけを更新し、他のフィルタ条件には影響しない。
  setSearchQuery: (q) =>
    set({ searchQuery: q, currentPage: GALLERY_SETTINGS.INIT_PAGE_NAM }),
  setSelectedCategory: (cat) =>
    set({ selectedCategory: cat, currentPage: GALLERY_SETTINGS.INIT_PAGE_NAM }),
  setSelectedTags: (tags) =>
    set({ selectedTags: tags, currentPage: GALLERY_SETTINGS.INIT_PAGE_NAM }),
  setCurrentPage: (page) => set({ currentPage: page }),
  toggleTag: (tag) =>
    set((state) => ({
      selectedTags: state.selectedTags.includes(tag)
        ? state.selectedTags.filter((t) => t !== tag)
        : [...state.selectedTags, tag],
      currentPage: GALLERY_SETTINGS.INIT_PAGE_NAM,
    })),

  clearFilters: () => set({ ...RESET_FILTERS }),
}));

/**
 * フィルタリング済みのデータを取得するセレクター
 * 使用例： const filteredUIParts = useFilteredUIParts();
 */
export const useFilteredUIParts = () => {
  return useGalleryStore(
    useShallow((state) => {
      const { searchQuery, selectedCategory, selectedTags } = state;
      return filterUIParts(UI_PARTS, { searchQuery, selectedCategory, selectedTags });
    }),
  );
};


const filterUIParts = (
  GalleryUIParts: GalleryUIPart[],
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

  return GalleryUIParts.filter((GalleryUIPart) => {
    const matchCategory =
      selectedCategory === 'all' ||
      GalleryUIPart.category.includes(selectedCategory);

    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => GalleryUIPart.tags.includes(tag)); // AND検索

    const matchQuery =
      query === '' ||
      GalleryUIPart.title.toLowerCase().includes(query) ||
      GalleryUIPart.tags.some((t) => t.toLowerCase().includes(query));

    return matchCategory && matchTags && matchQuery;
  });
};
