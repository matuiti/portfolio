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
