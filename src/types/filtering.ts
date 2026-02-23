// src/types/filtering.ts

export type FilterableItem = {
  title: string;
  description?: string;
  category: string | string[]; // WORKS(配列)とGALLERY(単一)の両方を許容
  tags: string[];
};

export type FilterState = {
  category: string;
  tags: string[];
  searchQuery: string;
};

// URL同期用ステートの型定義（ジェネリクスを導入）
export type URLSyncState<T extends string> = {
  category: T;
  tags: string[];
  searchQuery: string;
  currentPage: number;
};

// アクションの型定義（any を排除し、T型で制限）
export type URLSyncActions<T extends string> = {
  setSelectedCategory: (val: T) => void;
  setSelectedTags: (tags: string[]) => void;
  setSearchQuery: (q: string) => void;
  setCurrentPage: (page: number) => void;
};
