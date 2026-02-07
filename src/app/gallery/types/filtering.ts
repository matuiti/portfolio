// src/types/gallery/filtering.ts
import type { Category } from "./category";
import type { UIPart } from "./ui-part";

export type FilteringState = {
  selectedItem: UIPart | null;
  selectedCategory: Category;
  selectedTags: string[];
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  filteredItems: UIPart[];
  paginatedItems: UIPart[];
  noResultsMessage: string;
  categoryCounts: Record<string, number>;
  displayTitle: string;
  totalHitCount: number;
  isEmpty: boolean;
};

export type FilteringActions = {
  setSelectedItem: (item: UIPart | null) => void;
  setSelectedCategory: (cat: Category) => void;
  setSelectedTags: (tags: string[]) => void;
  setSearchQuery: (q: string) => void;
  setCurrentPage: (page: number) => void;
  clearFilters: () => void;
};

export type Filtering = FilteringState & FilteringActions;
