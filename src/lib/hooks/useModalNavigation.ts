// src/lib/hooks/useModalNavigation.ts
"use client";

import { useEffect } from "react";
import { UIPart } from "@/types/gallery/ui-part";

interface UseModalNavigationProps {
  currentItem: UIPart;
  allItems: UIPart[];
  onNavigate: (item: UIPart) => void;
  isOpen: boolean;
}

export function useModalNavigation({
  currentItem,
  allItems,
  onNavigate,
  isOpen,
}: UseModalNavigationProps) {
  const currentIndex = allItems.findIndex((item) => item.id === currentItem.id);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allItems.length - 1;

  const goToPrev = () => {
    if (hasPrev) onNavigate(allItems[currentIndex - 1]);
  };

  const goToNext = () => {
    if (hasNext) onNavigate(allItems[currentIndex + 1]);
  };

  // キーボードイベントの登録
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, allItems]); // 依存配列に注意

  return {
    currentIndex,
    totalCount: allItems.length,
    hasPrev,
    hasNext,
    goToPrev,
    goToNext,
  };
}
