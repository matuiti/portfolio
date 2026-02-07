"use client";

import { useCallback, useEffect } from "react";
import { Work } from "@/types/work";

type UseWorkModalNavigationProps = {
  currentWork: Work;
  allWorks: Work[];
  onNavigate: (work: Work) => void;
  onClose: () => void; // Escキーで閉じるために追加
  isOpen: boolean;
};

export function useWorkModalNavigation({
  currentWork,
  allWorks,
  onNavigate,
  onClose,
  isOpen,
}: UseWorkModalNavigationProps) {
  const currentIndex = allWorks.findIndex((w) => w.id === currentWork.id);
  const totalCount = allWorks.length;

  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < totalCount - 1;

  const goToPrev = useCallback(() => {
    if (hasPrev) onNavigate(allWorks[currentIndex - 1]);
  }, [hasPrev, onNavigate, allWorks, currentIndex]);

  const goToNext = useCallback(() => {
    if (hasNext) onNavigate(allWorks[currentIndex + 1]);
  }, [hasNext, onNavigate, allWorks, currentIndex]);

  // キーボード操作設定 [cite: 139]
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") onClose(); // Escキーで閉じる機能を追加
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goToPrev, goToNext, onClose]);

  return { currentIndex, totalCount, hasPrev, hasNext, goToPrev, goToNext };
}
