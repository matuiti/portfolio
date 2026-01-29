"use client";

import { UIPart } from "@/gallery/_types/ui-part";
import { useEffect, useCallback } from "react";

type UseModalNavigationProps = {
  currentItem: UIPart;
  allItems: UIPart[];
  onNavigate: (item: UIPart) => void;
  isOpen: boolean;
};

export function useModalNavigation({
  currentItem,
  allItems,
  onNavigate,
  isOpen,
}: UseModalNavigationProps) {
  const currentIndex = allItems.findIndex((item) => item.id === currentItem.id);

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allItems.length - 1;

  // useCallbackで関数をメモ化する
  const goToPrev = useCallback(() => {
    if (hasPrev) {
      onNavigate(allItems[currentIndex - 1]);
    }
  }, [hasPrev, onNavigate, allItems, currentIndex]);

  const goToNext = useCallback(() => {
    if (hasNext) {
      onNavigate(allItems[currentIndex + 1]);
    }
  }, [hasNext, onNavigate, allItems, currentIndex]);

  // キーボードイベントの登録
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goToPrev, goToNext]); // 必要最小限かつ正確な依存配列

  return {
    currentIndex,
    totalCount: allItems.length,
    hasPrev,
    hasNext,
    goToPrev,
    goToNext,
  };
}
