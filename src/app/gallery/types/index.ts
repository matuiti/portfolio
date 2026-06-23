export type GalelryCategory =
  | 'all'
  | 'button'
  | 'card'
  | 'form'
  | 'modal'
  | 'navigation'
  | 'list'
  | 'loading'
  | 'transition'
  | 'scroll'
  | 'layout'
  | 'other';

export type UIPart = {
  id: string;
  title: string;
  category: GalelryCategory;
  description: string;
  tags: string[];
  url: string;
  code: {
    html: string;
    css: string;
    js: string;
  };
};

export type TagGroup = {
  label: string;
  icon: string;
  tags: string[];
};

export type TabType = 'description' | 'code' | 'preview';

export type TabItem = {
  id: TabType;
  label: string;
  isMobileOnly?: boolean;
};

type FilteringState = {
  selectedItem: UIPart | null;
  selectedCategory: GalelryCategory;
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

type FilteringActions = {
  setSelectedItem: (item: UIPart | null) => void;
  setSelectedCategory: (cat: GalelryCategory) => void;
  setSelectedTags: (tags: string[]) => void;
  setSearchQuery: (q: string) => void;
  setCurrentPage: (page: number) => void;
  clearFilters: () => void;
};

export type Filtering = FilteringState & FilteringActions;
