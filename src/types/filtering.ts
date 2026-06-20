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