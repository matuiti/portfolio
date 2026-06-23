export type WorkCategory =
  | 'all'
  | 'web'
  | 'wordpress'
  | 'app'
  | 'game'
  | 'client'
  | 'nda';

// export type WorkCategory = WorkCategory | 'all';

/** 公開レベル */
export type DisclosureLevel = 'Full' | 'NDA';

/** 実績データ */
export type Work = {
  id: string;
  title: string;
  category: WorkCategory[];
  tags: string[];
  thumbnail?: string;
  images?: string[];
  summary: string; // カード用の短い説明

  role: string; // 担当役割
  duration: string; // 制作期間
  disclosureLevel: DisclosureLevel; // 公開レベル

  url?: string;
  articleUrl?: string;
  github?: string;
  siteId?: string; // サイト閲覧用ID
  sitePassword?: string; // サイト閲覧用パスワード

  background?: string; // 制作概要
  features?: string[]; // 実装機能
  points?: string[]; // 制作のポイント
};

export type WorkState = {
  searchQuery: string;
  selectedCategory: WorkCategory;
  selectedTags: string[];
  currentPage: number;
  itemsPerPage: number;

  setSearchQuery: (q: string) => void;
  setSelectedCategory: (cat: WorkCategory) => void;
  setSelectedTags: (tags: string[]) => void;
  setCurrentPage: (page: number) => void;

  toggleTag: (tag: string) => void;
  selectOnlyTag: (tag: string) => void;
  selectOnlyCategory: (cat: WorkCategory) => void;
  clearFilters: () => void;
};
