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

export type GalleryCategorys = { id: GalleryCategory; label: string }[];

export type GalleryUIPart = {
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
};

export type GalleryState = {
  selectedCategory: GalleryCategory;
  selectedTags: string[];
  searchQuery: string;
  currentPage: number;
  itemsPerPage: number;
  toggleTag: (tag: string) => void;
  setSelectedCategory: (cat: GalleryCategory) => void;
  setSelectedTags: (tags: string[]) => void;
  setSearchQuery: (q: string) => void;
  setCurrentPage: (page: number) => void;
  clearFilters: () => void;
};

export type ResetFilters = {
  searchQuery: string;
  selectedCategory: GalleryCategory;
  selectedTags: string[];
  currentPage: number;
};
