// 14. ModalNavigation
// 左右アローで前後の UI パーツへ移動。
// - フィルタリング結果の範囲で移動
// - モーダルが完成してから実装するのが合理的

// src/app/gallery/components/modal/ModalNavigation.tsx
"use client";

type ModalNavigationProps = {
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export const ModalNavigation = ({
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: ModalNavigationProps) => {
  return (
    <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
      {/* 前へボタン */}
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        className={`p-1.5 rounded-md transition-all ${
          hasPrev
            ? "text-neutral-700 hover:bg-white hover:shadow-sm"
            : "text-neutral-300 cursor-not-allowed"
        }`}
        aria-label="Previous item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* セパレーター */}
      <div className="w-[1px] h-4 bg-neutral-200 mx-0.5" />

      {/* 次へボタン */}
      <button
        onClick={onNext}
        disabled={!hasNext}
        className={`p-1.5 rounded-md transition-all ${
          hasNext
            ? "text-neutral-700 hover:bg-white hover:shadow-sm"
            : "text-neutral-300 cursor-not-allowed"
        }`}
        aria-label="Next item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};