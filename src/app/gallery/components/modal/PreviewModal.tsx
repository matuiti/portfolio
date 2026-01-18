// ここから更に強化

// 11. PreviewModal（dialog）
// モーダルの土台。
// - iframe の基盤ができてからでないと作れない
// - dialog のアクセシビリティ対応は早めに検証したい

// src/app/gallery/components/modal/PreviewModal.tsx
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

  // ビューポート幅の状態管理（350px - 1920px）
  const [viewportWidth, setViewportWidth] = useState(1200);

  // カスタムフックを使用してナビゲーションロジック（キーボード操作含む）を分離
  const { hasPrev, hasNext, goToPrev, goToNext, currentIndex, totalCount } =
    useModalNavigation({
      currentItem,
      allItems: allFilteredItems,
      onNavigate,
      isOpen,
    });

  // dialog要素の開閉制御
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  // アイテムが切り替わった際に幅をリセットしたい場合はここで調整可能
  // 今回はユーザーが設定した幅を維持する仕様とします

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="backdrop:bg-neutral-900/80 w-[95vw] h-[90vh] max-w-[1600px] max-h-[1000px] rounded-2xl overflow-hidden bg-neutral-100 shadow-2xl p-0 border-none"
      onClick={(e) => e.target === dialogRef.current && onClose()}
    >
      <div className="flex flex-col h-full">
        {/* ヘッダーセクション */}
        <header className="flex flex-wrap items-center justify-between px-6 py-3 bg-white border-b border-neutral-200 gap-4">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">
                Previewing
              </p>
              <h2 className="text-sm font-bold text-neutral-800">
                {currentItem.title}
              </h2>
            </div>

            {/* ページ数表示 */}
            <span className="text-xs text-neutral-400 bg-neutral-100 px-2 py-1 rounded">
              {currentIndex + 1} / {totalCount}
            </span>

            {/* 幅調整スライダー（双方向バインド対応コンポーネント） */}
            <ViewportSlider value={viewportWidth} onChange={setViewportWidth} />
          </div>

          <div className="flex items-center gap-4">
            {/* 前後のナビゲーションボタン */}
            <ModalNavigation
              onPrev={goToPrev}
              onNext={goToNext}
              hasPrev={hasPrev}
              hasNext={hasNext}
            />

            <div className="w-[1px] h-6 bg-neutral-200 mx-2" />

            {/* 閉じるボタン */}
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
        <main className="flex-1 overflow-auto bg-neutral-200/50 relative flex justify-center p-4 lg:p-10">
          {/* 背景にグリッドを敷くことで、透明なUIパーツの確認をしやすくする 
             tailwindで簡易的に表現。実際にはassetsの画像でも可
          */}
          <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

          <div
            style={{ width: `${viewportWidth}px` }}
            className="relative z-10 h-full max-w-full transition-[width] duration-300 ease-out shadow-2xl bg-white"
          >
            {/* public/gallery-parts/ui/[category]/[id]/index.html を読み込む */}
            <PreviewFrame
              url={`/gallery-parts/ui/${currentItem.category}/${currentItem.id}/index.html`}
            />
          </div>
        </main>

        {/* フッター（必要に応じてステータス等を表示） */}
        <footer className="px-6 py-2 bg-white border-t border-neutral-100 text-[10px] text-neutral-400 flex justify-between">
          <span>ID: {currentItem.id}</span>
          <span>Category: {currentItem.category}</span>
        </footer>
      </div>
    </dialog>
  );
};