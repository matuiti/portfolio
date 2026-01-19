"use client";

import { useEffect, useRef, useState } from "react";
import { UIPart } from "@/types/gallery/ui-part";
import { ViewportSlider } from "./ViewportSlider";
import { PreviewFrame } from "../preview/PreviewFrame";
import { ModalNavigation } from "./ModalNavigation";
import { useModalNavigation } from "@/lib/hooks/useModalNavigation";

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentItem: UIPart;
  allFilteredItems: UIPart[];
  onNavigate: (item: UIPart) => void;
}

export const PreviewModal = ({
  isOpen,
  onClose,
  currentItem,
  allFilteredItems,
  onNavigate,
}: PreviewModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [viewportWidth, setViewportWidth] = useState(1200);

  const { hasPrev, hasNext, goToPrev, goToNext, currentIndex, totalCount } =
    useModalNavigation({
      currentItem,
      allItems: allFilteredItems,
      onNavigate,
      isOpen,
    });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        // モーダルが開いた時に背面スクロールを禁止
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
        /* 1. 基本配置とサイズ */
        fixed inset-0 m-auto
        w-[95vw] h-[90vh] max-w-[1600px] max-h-[1000px]
        
        /* 2. スタイル */
        rounded-[32px] overflow-hidden bg-neutral-100 shadow-2xl p-0 border-none
        
        /* 3. 背景（オーバーレイ）の設定 */
        backdrop:bg-neutral-900/60 backdrop:backdrop-blur-sm
        
        /* 4. アニメーション（任意） */
        animate-in fade-in zoom-in-95 duration-300
      `}
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      <div className="flex flex-col h-full w-full">
        {/* ヘッダーセクション（高さ固定） */}
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

            <ViewportSlider value={viewportWidth} onChange={setViewportWidth} />
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
          {/* 背景グリッド */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

          {/* 1. プレビューを囲む「ステージ」エリア 
    ここを flex + items-center にすることで、拡縮されたコンテンツが常に中央に来るようにします。
  */}
          <div className="flex-1 relative z-10 p-4 lg:p-10 flex items-center justify-center overflow-hidden">
            {/* 2. プレビューフレーム容器
      この div は ViewportSlider で決めた「仮想的な幅」を持ちます。
      PreviewFrame コンポーネント側で、この幅をモーダルの実寸に合わせて
      transform: scale() で縮小しているはずです。
    */}
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

        {/* フッター（高さ固定） */}
        <footer className="flex-shrink-0 px-6 py-2 bg-white border-t border-neutral-100 text-[10px] text-neutral-400 flex justify-between z-20">
          <span>ID: {currentItem.id}</span>
          <span>Category: {currentItem.category}</span>
        </footer>
      </div>
    </dialog>
  );
};
