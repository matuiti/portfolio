// src / components / ui / Buttons / PageTopButton / index.tsx;
"use client";

import { tv, type VariantProps } from "tailwind-variants";
import React, { useEffect, useState } from "react";
import { useScrollThreshold } from "@/lib/hooks/useScrollThreshold"; // [cite: 233]

/**
 * ページトップボタンのスタイル定義
 * 垂直・水平位置は動的な計算（styleプロパティ）で行うため、基本スタイルのみ定義 [cite: 7, 235]
 */
const pageTopButtonStyles = tv({
  base: [
    "fixed z-pagetop uppercase text-sm", // [cite: 7, 217]
    "flex h-20 w-20 flex-col items-center justify-center rounded-full", // [cite: 7]
    "bg-black text-white shadow-lg",
    "transition-[opacity,transform] duration-500 ease-in-out",
    "hover:opacity-hover active:scale-95 cursor-pointer",
  ],
  variants: {
    isVisible: {
      true: "visible opacity-100 translate-y-0",
      false: "invisible opacity-0 translate-y-4 pointer-events-none",
    },
  },
  defaultVariants: {
    isVisible: false,
  },
});

/**
 * プロップスの型定義
 * VariantPropsに typeof pageTopButtonStyles を渡すことでエラーを解消します [cite: 46, 180]
 */
type PageTopButtonProps = VariantProps<typeof pageTopButtonStyles> & {
  threshold?: number;
  containerWidth?: number; // --spacing-container-max (1200px) [cite: 217]
};

export const PageTopButton = ({
  threshold = 300,
  containerWidth = 1200,
}: PageTopButtonProps) => {
  const isExceeded = useScrollThreshold(threshold);
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({
    bottom: "1.5rem",
    right: "1.5rem",
    left: "auto",
  });

  useEffect(() => {
    const handleLayout = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const footer = document.querySelector("footer");

      // --- 1. 垂直位置（Bottom）の計算 (既存のフッター回避ロジック) ---
      const BASE_GAP_PX = 20;
      let currentBottomPx = BASE_GAP_PX;

      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        if (footerRect.top < viewportHeight) {
          currentBottomPx = viewportHeight - footerRect.top + BASE_GAP_PX;
        }
      }

      // --- 2. 水平位置（Left/Right）の計算 ---
      const BUTTON_WIDTH_PX = 80; // w-20 = 80px [cite: 7]

      /**
       * globals.css の .section-padding-x の定義に準拠した動的余白 [cite: 213, 216, 218]
       */
      let sectionPaddingPx = 15; // mini [cite: 216]
      if (viewportWidth >= 1140) {
        sectionPaddingPx = 40; // small
      } else if (viewportWidth >= 840) {
        sectionPaddingPx = 30; // tablet
      } else if (viewportWidth >= 540) {
        sectionPaddingPx = 20; // mobile
      }

      // 画面が「コンテナ最大幅 + 両端のセクション余白」より広いか判定 [cite: 217, 219]
      const isWideScreen =
        viewportWidth > containerWidth + sectionPaddingPx * 2;

      const newStyle: React.CSSProperties = {
        bottom: `calc(${currentBottomPx} / 16 * 1rem)`, // 規約に従いrem換算 [cite: 221]

        // 仕様: 画面が狭い間は右端からの余白を維持し、広くなったらコンテナ右端に収める
        left: isWideScreen ? "50%" : "auto",
        right: isWideScreen ? "auto" : `calc(${sectionPaddingPx} / 16 * 1rem)`,

        // 広い画面では、中央(50%)から「コンテナ半径 - ボタン幅」分右に寄せる
        marginLeft: isWideScreen
          ? `calc((${containerWidth} / 2 - ${BUTTON_WIDTH_PX}) / 16 * 1rem)`
          : "0",
      };

      setPositionStyle(newStyle);
    };

    window.addEventListener("scroll", handleLayout, { passive: true });
    window.addEventListener("resize", handleLayout);
    handleLayout();

    return () => {
      window.removeEventListener("scroll", handleLayout);
      window.removeEventListener("resize", handleLayout);
    };
  }, [containerWidth]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={pageTopButtonStyles({ isVisible: isExceeded })}
      style={positionStyle}
      aria-label="ページ上部へ戻る"
    >
      <span>Page</span>
      <span>Top</span>
    </button>
  );
};
