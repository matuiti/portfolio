import { create } from "zustand";
import { WorkFilterCategory } from "@/types/work";
import { ALL_WORKS } from "@/data/works";

type WorkState = {
  // 状態
  searchQuery: string;
  selectedCategory: WorkFilterCategory;
  selectedTags: string[];
  currentPage: number;
  itemsPerPage: number;

  // アクション
  setSearchQuery: (q: string) => void;
  setSelectedCategory: (cat: WorkFilterCategory) => void;
  setSelectedTags: (tags: string[]) => void;
  setCurrentPage: (page: number) => void;

  // 便利アクション（ご要望の「リセット＋単一選択」）
  toggleTag: (tag: string) => void;
  selectOnlyTag: (tag: string) => void;
  selectOnlyCategory: (cat: WorkFilterCategory) => void;
  clearFilters: () => void;
};

export const useWorkStore = create<WorkState>((set) => ({
  searchQuery: "",
  selectedCategory: "all",
  selectedTags: [],
  currentPage: 1,
  itemsPerPage: 6,

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

  selectOnlyTag: (tag) =>
    set({
      searchQuery: "",
      selectedCategory: "all",
      selectedTags: [tag],
      currentPage: 1,
    }),

  selectOnlyCategory: (cat) =>
    set({
      searchQuery: "",
      selectedTags: [],
      selectedCategory: cat,
      currentPage: 1,
    }),

  clearFilters: () =>
    set({
      searchQuery: "",
      selectedCategory: "all",
      selectedTags: [],
      currentPage: 1,
    }),
}));

/**
 * フィルタリング済みのデータを取得するセレクター（メモ化用）
 */
export const useFilteredWorks = () => {
  const { searchQuery, selectedCategory, selectedTags } = useWorkStore();

  return ALL_WORKS.filter((work) => {
    const matchCategory =
      selectedCategory === "all" || work.category.includes(selectedCategory);
    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => work.tags.includes(tag));
    const matchQuery =
      searchQuery === "" ||
      work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchCategory && matchTags && matchQuery;
  });
};
