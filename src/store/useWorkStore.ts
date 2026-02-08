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

  // 便利アクション（特定の操作時に他をリセットする）
  toggleTag: (tag: string) => void;
  selectOnlyTag: (tag: string) => void;
  selectOnlyCategory: (cat: WorkFilterCategory) => void;
  clearFilters: () => void;
};

export const useWorkStore = create<WorkState>((set) => ({
  // --- 初期状態 ---
  searchQuery: "",
  selectedCategory: "all",
  selectedTags: [],
  currentPage: 1,
  itemsPerPage: 6,

  // --- 基本アクション（独立して状態を更新） ---
  // URL同期や個別のフィルタ操作で使用
  setSearchQuery: (q) => set({ searchQuery: q, currentPage: 1 }),
  setSelectedCategory: (cat) => set({ selectedCategory: cat, currentPage: 1 }),
  setSelectedTags: (tags) => set({ selectedTags: tags, currentPage: 1 }),
  setCurrentPage: (page) => set({ currentPage: page }),

  // --- 複合アクション（内部で他をリセットする） ---
  // UI上の特定の導線（カテゴリラベルクリックなど）で使用
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
 * フィルタリング済みのデータを取得するセレクター
 * （コンポーネント側で useFilteredWorks() として使用）
 */
export const useFilteredWorks = () => {
  const { searchQuery, selectedCategory, selectedTags } = useWorkStore();

  return ALL_WORKS.filter((work) => {
    // カテゴリ一致判定
    const matchCategory =
      selectedCategory === "all" || work.category.includes(selectedCategory);

    // タグ一致判定（選択されたタグすべてを含んでいるか）
    const matchTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => work.tags.includes(tag));

    // 検索クエリ一致判定（タイトルまたはタグにキーワードが含まれるか）
    const matchQuery =
      searchQuery === "" ||
      work.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      work.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchCategory && matchTags && matchQuery;
  });
};
