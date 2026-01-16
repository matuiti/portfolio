import type { UIPart } from "./ui-part";

export type FilteringState = {
  selectedCategory: string;
  selectedTags: string[];
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  filteredItems: UIPart[];
  paginatedItems: UIPart[];
};

export type FilteringActions = {
  setSelectedCategory: (cat: string) => void;
  setSelectedTags: (tags: string[]) => void;
  setSearchQuery: (q: string) => void;
  setCurrentPage: (page: number) => void;
};

export type Filtering = FilteringState & FilteringActions;
