"use client";

import { useEffect, useRef, useState } from "react";
import { UIPart } from "@/types/gallery/ui-part";
import { ViewportSlider } from "./ViewportSlider";
import { PreviewFrame } from "../preview/PreviewFrame";
import { ModalNavigation } from "./ModalNavigation";
import { useModalNavigation } from "@/lib/hooks/useModalNavigation";
import { PREVIEW_MODAL_SETTINGS } from "@/lib/constants/gallery";

type PreviewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  currentItem: UIPart;
  allFilteredItems: UIPart[];
  onNavigate: (item: UIPart) => void;
};

export const PreviewModal = ({
  isOpen,
  onClose,
  currentItem,
  allFilteredItems,
  onNavigate,
}: PreviewModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // 1. 状態管理: key属性の恩恵により、マウント時に常にデフォルト幅になります
  const [viewportWidth, setViewportWidth] = useState<number>(
    PREVIEW_MODAL_SETTINGS.DEFAULT_WIDTH,
  );

  const { hasPrev, hasNext, goToPrev, goToNext, currentIndex, totalCount } =
    useModalNavigation({
      currentItem,
      allItems: allFilteredItems,
      onNavigate,
      isOpen,
    });

  // 2. モーダル開閉と背面スクロール禁止の制御
  // ここでの setState (setViewportWidth) は削除し、DOM制御に専念します
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = "hidden";
      }
    } else {
      dialog.close();
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className={`
        fixed inset-0 m-auto
        w-[95vw] h-[90vh] max-w-[1600px] max-h-[1000px]
        rounded-[32px] overflow-hidden bg-neutral-100 shadow-2xl p-0 border-none
        backdrop:bg-neutral-900/60 backdrop:backdrop-blur-sm
        animate-in fade-in zoom-in-95 duration-300
      `}
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      <div className="flex flex-col h-full w-full">
        {/* ヘッダーセクション */}
        <header className="flex-shrink-0 flex flex-wrap items-center justify-between px-6 py-4 bg-white border-b border-neutral-200 gap-4 z-20">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                Previewing
              </p>
              <h2 className="text-sm font-bold text-neutral-800">
                {currentItem.title}
              </h2>
            </div>

            <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-1 rounded">
              {currentIndex + 1} / {totalCount}
            </span>

            <ViewportSlider
              value={viewportWidth}
              onChange={setViewportWidth}
              min={PREVIEW_MODAL_SETTINGS.MIN_WIDTH}
              max={PREVIEW_MODAL_SETTINGS.MAX_WIDTH}
            />
          </div>

          <div className="flex items-center gap-4">
            <ModalNavigation
              onPrev={goToPrev}
              onNext={goToNext}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />

            <div className="w-[1px] h-6 bg-neutral-200 mx-2" />

            <button
              onClick={onClose}
              className="group p-2 hover:bg-red-50 rounded-full transition-all"
              aria-label="Close modal"
            >
              <svg
                className="w-6 h-6 text-neutral-400 group-hover:text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </header>

        {/* メインプレビューエリア */}
        <main className="flex-1 bg-neutral-200/50 relative overflow-hidden flex flex-col">
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

          <div className="flex-1 relative z-10 p-4 lg:p-10 flex items-center justify-center overflow-hidden">
            <div
              style={{ width: `${viewportWidth}px` }}
              className="relative h-full max-w-none transition-[width] duration-300 ease-out shadow-2xl bg-white flex items-center"
            >
              <PreviewFrame
                url={`/gallery-parts/ui/${currentItem.category}/${currentItem.id}/index.html`}
              />
            </div>
          </div>
        </main>

        {/* フッターセクション */}
        <footer className="flex-shrink-0 px-6 py-2 bg-white border-t border-neutral-100 text-[10px] text-neutral-400 flex justify-between z-20">
          <span>ID: {currentItem.id}</span>
          <span>Category: {currentItem.category}</span>
        </footer>
      </div>
    </dialog>
  );
};
