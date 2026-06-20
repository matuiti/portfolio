export type FilterableItem = {
  title: string;
  description?: string;
  category: string | string[];
  tags: string[];
};

export type FilterState = {
  category: string;
  tags: string[];
  searchQuery: string;
};

export type URLSyncState<T extends string> = {
  category: T;
  tags: string[];
  searchQuery: string;
  currentPage: number;
};

export type URLSyncActions<T extends string> = {
  setSelectedCategory: (val: T) => void;
  setSelectedTags: (tags: string[]) => void;
  setSearchQuery: (q: string) => void;
  setCurrentPage: (page: number) => void;
};
