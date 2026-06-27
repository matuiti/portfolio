// 'use client';
import { useState, useMemo } from 'react';
import { GalleryCategory, GalleryState, GalleryUIPart } from '@/gallery/types';
import { GALLERY_CATEGORIES, GALLERY_SETTINGS } from '../../data';

export function useFiltering(allItems: GalleryUIPart[]): GalleryState {
  const [selectedItem, setSelectedItem] = useState<GalleryUIPart | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<GalleryCategory>(
    GALLERY_SETTINGS.DEFAULT_CATEGORY,
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = GALLERY_SETTINGS.ITEMS_PER_PAGE;

  const resetPage = () => setCurrentPage(1);

  const categoryCounts = useMemo(() => {
    const counts = allItems.reduce(
      (acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );
    return { all: allItems.length, ...counts };
  }, [allItems]);

  const filteredItems = useMemo(() => {
    let items = [...allItems];

    // カテゴリ絞り込み
    if (selectedCategory !== 'all') {
      items = items.filter((item) => item.category === selectedCategory);
    }

    // タグ絞り込み
    if (selectedTags.length > 0) {
      items = items.filter((item) =>
        selectedTags.every((tag) => item.tags.includes(tag)),
      );
    }

    // 検索ワード絞り込み
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q),
      );
    }

    return items;
  }, [allItems, selectedCategory, selectedTags, searchQuery]);

  // ページネーション計算
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredItems.slice(start, start + itemsPerPage);
  }, [filteredItems, currentPage, itemsPerPage]);

  const displayTitle = useMemo(() => {
    const label =
      GALLERY_CATEGORIES.find((c) => c.id === selectedCategory)?.label ||
      'すべて';
    return searchQuery.trim() ? `${label} : "${searchQuery}"` : label;
  }, [selectedCategory, searchQuery]);

  const totalHitCount = filteredItems.length;
  const isEmpty = totalHitCount === 0;

  const noResultsMessage = isEmpty
    ? searchQuery.trim() !== ''
      ? `"${searchQuery}" に一致するアイテムが見つかりませんでした。`
      : '該当するアイテムがありません。'
    : '';

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedTags([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  return {
    // State
    selectedItem,
    selectedCategory,
    selectedTags,
    searchQuery,
    currentPage,
    itemsPerPage,
    totalPages,
    filteredItems,
    paginatedItems,
    noResultsMessage,
    categoryCounts,
    displayTitle,
    totalHitCount,
    isEmpty,

    // Actions
    clearFilters,
    setSelectedItem,
    setSelectedCategory: (cat: GalleryCategory) => {
      setSelectedCategory(cat);
      resetPage();
    },
    setSelectedTags: (tags: string[]) => {
      setSelectedTags(tags);
      resetPage();
    },
    setSearchQuery: (q: string) => {
      setSearchQuery(q);
      resetPage();
    },
    setCurrentPage,
  };
}
