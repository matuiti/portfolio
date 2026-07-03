import { WorkCategory } from "@/types/work";

export type ResetFilters = {
  searchQuery: string;
  selectedCategory: WorkCategory;
  selectedTags: string[];
  currentPage: number;
};
