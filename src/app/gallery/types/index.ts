export type GalleryCategory =
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
  category: GalleryCategory;
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

export type GalleryState = {
  // selectedItem: UIPart | null;
  selectedCategory: GalleryCategory;
  selectedTags: string[];
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  // totalPages: number;
  // filteredItems: UIPart[];
  // paginatedItems: UIPart[];
  // noResultsMessage: string;
  // categoryCounts: Record<string, number>;
  // displayTitle: string;
  // totalHitCount: number;
  // isEmpty: boolean;
  // setSelectedItem: (item: UIPart | null) => void;
  toggleTag: (tag: string) => void;
  setSelectedCategory: (cat: GalleryCategory) => void;
  setSelectedTags: (tags: string[]) => void;
  setSearchQuery: (q: string) => void;
  setCurrentPage: (page: number) => void;
  clearFilters: () => void;
};
