// src/types/filtering.ts (新規作成、または共通型定義へ)
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
